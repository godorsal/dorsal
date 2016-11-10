(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('CaseController', CaseController);

    CaseController.$inject = ['$scope', '$window', '$interval', '$timeout', '$translate', 'CaseService', 'DrslRatingService',
    'CaseDetailsService', 'EscalationFormService', 'ShareCaseService', 'CaseAgreementService', 'StatusModel',
    'Rating', 'Expertbadge', 'DrslMetadata', 'Caseupdate', 'AttachmentModalService', 'DrslAttachFileService',
    'DrslNewCaseService', '$filter', '_', 'DrslUserFlowService', 'DrslHipChatService', '$sce'];

    function CaseController($scope, $window, $interval, $timeout, $translate, CaseService, DrslRatingService, CaseDetailsService,
        EscalationFormService, ShareCaseService, CaseAgreementService, StatusModel, Rating,
        Expertbadge, DrslMetadata, Caseupdate, AttachmentModalService, DrslAttachFileService,
        DrslNewCaseService, $filter, _, DrslUserFlowService, DrslHipChatService, $sce) {

            // Handle user flow redirects and messaging
            DrslUserFlowService.handleUserFlow();

            // Set the view model and view model properties/methods
            var vm = this, casePoll;
            vm.DrslMetadata = DrslMetadata;
            vm.pausePollForCaseUpdates = false;
            vm.badges = [];
            vm.expertBadges = [];
            vm.expertBadgeResources = [];
            vm.statusStates = [];
            vm.cases = [];
            vm.updates = [];
            vm.detailedResolutions = [];
            vm.currentCase = {};
            vm.status = {
                created: 'case.details.status.created',
                assigned: 'case.details.status.assigned',
                working: 'case.details.status.working',
                resolved: 'case.details.status.resolved',
                completed: 'case.details.status.completed'
            };
            vm.currentUser = {};
            vm.showNotifications = false;
            vm.shareCaseMessage = $translate.instant('case.details.shareCaseMessage');
            vm.cannotShareCaseMessage = $translate.instant('cannotShareCaseMessage');

            // vm methods
            vm.init = init;
            vm.pollForCaseUpdates = pollForCaseUpdates;
            vm.getCurrentCase = getCurrentCase;
            vm.setCurrentCase = setCurrentCase;
            vm.openRating = openRating;
            vm.openDetails = openDetails;
            vm.openEscalation = openEscalation;
            vm.openShare = openShare;
            vm.openAttachment = openAttachment;
            vm.passedStep = passedStep;
            vm.openChat = openChat;
            vm.isCaseExpert = isCaseExpert;
            vm.openCaseAgreement = openCaseAgreement;
            vm.sendMessage = sendMessage;
            vm.isCurrentSender = isCurrentSender;
            vm.getMessages = getMessages;
            vm.getUserName = getUserName;
            vm.getCurrentUserName = getCurrentUserName;
            vm.maxResults = DrslHipChatService.maxResults;
            /**
            * Initialize the controller's data.
            */
            function init() {
                var getCurrentUser = (typeof(vm.currentUser.email) === 'undefined'),
                getStatusStates = (vm.statusStates.length === 0),
                getBadges = (vm.badges.length === 0);

                // Make a call to get the initial data.
                CaseService.getEntityData({
                    'getCurrentUser': getCurrentUser,
                    'getStatusStates': getStatusStates,
                    'getBadges': getBadges
                }).then(function (data) {
                    var i, currentCaseIndex = 0;

                    // Set the vm's  support cases
                    vm.supportcases = data.supportCase;

                    // Set the vm's badges
                    if (data.badges) {
                        vm.badges = data.badges;
                    }

                    // Try and find the currentCase (if we have one) in the list of support cases
                    if (vm.currentCase && vm.currentCase.id) {
                        for (i = 0; i < vm.supportcases.length; i++) {
                            if (vm.currentCase.id === vm.supportcases[i].id) {
                                currentCaseIndex = i;
                                break;
                            }
                        }
                    }

                    // Set the current case to the first case, or if we found one above, use that index
                    vm.setCurrentCase(vm.supportcases[currentCaseIndex]);

                    // Set the vm's currentUser
                    if (data.identity) {
                        vm.currentUser = data.identity;
                    }

                    // Determine if the current user is the case creator and set the vm's "shareMessage"
                    if (vm.currentCase && (vm.currentCase.user.login === vm.currentUser.login)) {
                        vm.isCreator = true;
                        vm.shareMessage = vm.shareCaseMessage;
                    } else {
                        vm.shareMessage = vm.cannotShareCaseMessage;
                    }

                    // Set the vm's status states
                    if (data.statusStates) {
                        vm.statusStates = data.statusStates;
                    }

                    // Poll for case updates, if we're not already doing so
                    if (!casePoll) {
                        vm.pollForCaseUpdates();
                    }

                    // If we just created a case, call 'getCurrentCase' so that we can
                    // set the vm's currentCase and add attachments if necessary
                    if (DrslNewCaseService.newCaseId) {
                        getCurrentCase();
                    }
                });

            }

            /**
            * Poll for case updates at an interval provided by DrslMetadata
            */
            function pollForCaseUpdates() {
                casePoll = $interval(function () {
                    if (!vm.pausePollForCaseUpdates) {
                        $interval.cancel(vm.messageScheduler);
                        // clearInterval(vm.messageScheduler);
                        vm.init();
                    }
                }, vm.DrslMetadata.casePollingRateSeconds * 1000);
            }

            /**
            * Queries for and adds updates that match the current case id to the vm's updates array.
            */
            function getCaseUpdates() {
                // Reset/empty the vm's updates array
                vm.updates = [];

                // Query the case update service and look for/add any updates that match the current case id.
                Caseupdate.query(function (result) {
                    result.reverse().forEach(function (update) {
                        // Only continue if the id matches the current case id
                        if (update.supportcase.id === vm.currentCase.id) {
                            // Push detailed resolutions to their own vm array "detailedResolutions"
                            if (update.updatetype.id == 2) {
                                vm.detailedResolutions.push(update);
                            }
                            vm.updates.push(update)
                        }
                    })
                })
            }

            /**
            * Gets the case's expert badges via a call to the CaseService's getExpertBadges method,
            * then updates the vm's expertBadges and expertBadgeResources
            */
            function getCaseExpertBadges() {
                // Only continue if we have a case and the case has an expert assigned
                if (vm.currentCase && vm.currentCase.expertaccount && vm.currentCase.expertaccount.id) {
                    CaseService.getExpertBadges(vm.currentCase.expertaccount.id).then(function (data) {
                        // Update the vm's badge properties
                        vm.expertBadges = data.badges;
                        vm.expertBadgeResources = data.expertBadgeResources;
                    });
                }
            }

            /**
            * Checks to see if the current user matches the current case's expert.
            * @returns {boolean} returns true if the current user matches the current case's expert.
            */
            function isCaseExpert() {
                var caseExpert = false;

                if (vm.currentCase && vm.currentCase.expertaccount && vm.currentUser.email) {
                    caseExpert = (vm.currentCase.expertaccount.user.email === vm.currentUser.email);
                }

                return caseExpert;
            }

            /**
            * Gets and sets the vm's current case.
            * Usually called after a new case has been added
            */
            function getCurrentCase() {
                var thisCase,
                newCaseId = DrslNewCaseService.getConsumableNewCaseId();

                // Only continue if the new case id hasn't been consumed already
                if (newCaseId) {
                    thisCase = _.find(vm.supportcases, function (supportcase) {
                        return DrslNewCaseService.newCaseId == supportcase.id;
                    });

                    // Set the current case, if we found a match
                    if (thisCase) {
                        setCurrentCase(thisCase);
                    }

                    // Add attachments to the new case
                    DrslAttachFileService.uploadAttachFileList();
                }
            }

            /**
            * Sets the currentCase reference to the given case object.
            * @param targetCase a case object
            */
            function setCurrentCase(targetCase) {
                console.log("SETTING CURRENT CASE CLEAR INTERVAL");
                // clearInterval(vm.messageScheduler);
                $interval.cancel(vm.messageScheduler);
                // Set the vm's currentCase to the provided targetCase
                vm.currentCase = targetCase;
                console.log(vm.currentCase.status);
                if(vm.currentCase.status.name === 'CLOSED'){
                    DrslHipChatService.maxResults = '1000';
                    vm.maxResults = DrslHipChatService.maxResults;
                    getMessages();
                } else {
                    DrslHipChatService.maxResults = '5';
                    vm.maxResults = DrslHipChatService.maxResults;
                    countdown(15);
                    vm.messageScheduler = $interval(function () {
                    // vm.messageScheduler = setInterval(function () {
                        getMessages();
                        countdown(15);
                    }, 15000, getMessages());
                }
                // Reset/clear the estimate logs
                vm.estimateLogs = [];

                // Update the vm's estimate logs
                if (targetCase && targetCase.estimateLog) {
                    vm.estimateLogs = targetCase.estimateLog.split('##');
                    vm.estimateLogs.pop();
                    vm.estimateLogs = vm.estimateLogs.reverse();
                }

                // Get the expert badges and case updates
                getCaseExpertBadges();
                getCaseUpdates();

                // Broadcast a "currentCaseSet" event down to the child components, so they are aware of the change.
                if (targetCase) {
                    $timeout(function () {
                        $scope.$broadcast('currentCaseSet');
                    }, 1);
                }
            }

            /**
            * Opens the rating dialog.
            */
            function openRating() {
                // Only continue/open if the current case's status is completed and
                // the current user is not the case's expert (only a case's user should rate/close a case)
                if (StatusModel.checkCaseStatus(vm.currentCase.status, 'completed') && !vm.isCaseExpert()) {
                    var modalInstance = DrslRatingService.open(vm.currentCase, vm.badges);

                    modalInstance.result.then(function (data) {
                        // Init a new rating object for persisting
                        var newRating = {
                            id: null,
                            dateRated: null,
                            score: data.score,
                            rateDetails: data.rateDetails,
                            ratingComments: data.ratingComments,
                            hasExpertExceeded: data.hasExpertExceeded,
                            supportcase: vm.currentCase
                        };

                        // Workflow: change the state/status of the current case to closed
                        vm.currentCase.status = StatusModel.getState('closed');
                        DrslHipChatService.getRoom(vm.currentCase.technology.name + vm.currentCase.id)
                        .then(function (res) {
                            DrslHipChatService.archiveRoom(res.data)
                        }, function (res) {
                            console.log("ERROR HANDLER", res);
                        })
                        // Add/update expert badges and their counts
                        updateExpertBadges(data.selectedBadges);

                        // Save the rating
                        Rating.save(newRating);

                        // Update the current case
                        vm.currentCase.$update();
                    });

                    // Pause polling for case updates
                    modalInstance.opened.then(function () {
                        vm.pausePollForCaseUpdates = true;
                    });

                    // Cleanup after closing the dialog
                    modalInstance.closed.then(function () {
                        var i, badge;

                        // Un-pause the polling for case updates
                        vm.pausePollForCaseUpdates = false;

                        // Cleanup/remove any selected state properties added to the badges
                        for (i = 0; i < vm.badges.length; i++) {
                            badge = vm.badges[i];

                            if (badge.selected) {
                                delete badge.selected;
                            }
                        }
                    });
                }
            }

            /**
            * Updates expertbadge records, increases badge counts and/or adds new records.
            * @param selectedBadges An array of selected badges.
            */
            function updateExpertBadges(selectedBadges) {
                var badgesToUpdate, badgesToAdd, newExpertBadge, i;

                // get the badges to update
                badgesToUpdate = vm.expertBadgeResources.filter(function (expertBadgeResource) {
                    var found = false, i;

                    for (i = 0; i < selectedBadges.length; i++) {
                        if (selectedBadges[i].id === expertBadgeResource.badge.id) {
                            expertBadgeResource.expertBadgeCount++;
                            found = true;
                            break;
                        }
                    }

                    return found;
                });

                // get the badges to add
                badgesToAdd = selectedBadges.filter(function (badge) {
                    var found = false, i;

                    for (i = 0; i < vm.expertBadgeResources.length; i++) {
                        if (badge.id === vm.expertBadgeResources[i].badge.id) {
                            found = true;
                            break;
                        }
                    }

                    return !found;
                });

                // update badges
                for (i = 0; i < badgesToUpdate.length; i++) {
                    badgesToUpdate[i].$update();
                }

                // add badges
                for (i = 0; i < badgesToAdd.length; i++) {
                    newExpertBadge = {
                        id: null,
                        expertBadgeCount: 1,
                        expertaccount: vm.currentCase.expertaccount,
                        badge: badgesToAdd[i]
                    };

                    Expertbadge.save(newExpertBadge);
                }
            }

            /**
            * Opens the case details dialog.
            */
            function openDetails() {
                var modalInstance = CaseDetailsService.open(vm.currentCase);

                modalInstance.result

                // Pause polling for case updates
                modalInstance.opened.then(function () {
                    vm.pausePollForCaseUpdates = true;
                });

                // Un-pause the polling for case updates
                modalInstance.closed.then(function () {
                    vm.pausePollForCaseUpdates = false;
                });
            }

            /**
            * Opens the escalation dialog.
            */
            function openEscalation() {
                // Only continue/open if the current case's state/status is not closed.
                if (!StatusModel.checkCaseStatus(vm.currentCase.status, 'closed')) {
                    var modalInstance = EscalationFormService.open(vm.currentCase);

                    // Pause polling for case updates
                    modalInstance.opened.then(function () {
                        vm.pausePollForCaseUpdates = true;
                    });

                    // Un-pause the polling for case updates
                    modalInstance.closed.then(function () {
                        vm.pausePollForCaseUpdates = false;
                    });
                }
            }

            /**
            * Opens the share dialog.
            */
            function openShare() {
                // Only continue/open if the current user is the current case's creator.
                if (vm.isCreator) {
                    var modalInstance = ShareCaseService.open(vm.currentCase);

                    // Pause polling for case updates
                    modalInstance.opened.then(function () {
                        vm.pausePollForCaseUpdates = true;
                    });

                    // Un-pause the polling for case updates
                    modalInstance.closed.then(function () {
                        vm.pausePollForCaseUpdates = false;
                    });
                }
            }

            /**
            * Opens the attachment dialog
            */
            function openAttachment() {
                var modalInstance = AttachmentModalService.open(vm.currentCase);

                // Pause polling for case updates
                modalInstance.opened.then(function () {
                    vm.pausePollForCaseUpdates = true;
                });

                // Un-pause the polling for case updates
                modalInstance.closed.then(function () {
                    vm.pausePollForCaseUpdates = false;
                });
            }

            /**
            * Opens the chat in a new window.
            */
            function openChat() {
                // Only continue/open if we're passed the fist step
                if (vm.passedStep(1)) {
                    $window.open(vm.currentCase.chatRoom.link, '_blank');
                }
            }

            /**
            * Opens the Case Agreement dialog.
            */
            function openCaseAgreement() {
                // Only continue/open if the current user is not the case's expert,
                // the case's user should only be allowed to open the agreement dialog.
                if (!vm.isCaseExpert()) {
                    var modalInstance = CaseAgreementService.open(vm.currentCase, vm.currentCase.expert);

                    modalInstance.result.then(function () {
                        var logDate = $filter('date')(new Date(), 'MMM dd, yyyy HH:mm');

                        // Update the case's properties
                        vm.currentCase.isApproved = true;
                        vm.currentCase.status = StatusModel.getState('working');
                        vm.currentCase.estimateLog = (vm.currentCase.estimateLog) ? vm.currentCase.estimateLog : '';
                        vm.currentCase.estimateLog += 'ACCEPTED: ' + logDate + '\n' + 'OUTCOME: ' + vm.currentCase.expectedResult + '\n' + 'ESTIMATE: ' + vm.currentCase.estimateHours + 'hrs ' + '\n' + 'COMMENT: ' + vm.currentCase.estimateComment + '##';

                        // Update the case
                        vm.currentCase.$update();
                    });

                    // Pause polling for case updates
                    modalInstance.opened.then(function () {
                        vm.pausePollForCaseUpdates = true;
                    });

                    // Un-pause the polling for case updates
                    modalInstance.closed.then(function () {
                        vm.pausePollForCaseUpdates = false;
                    });
                }
            }
            function getMessages(){
                var messagesID = vm.currentCase.technology.name + vm.currentCase.id;
                DrslHipChatService.maxResults = vm.maxResults;
                DrslHipChatService.getMessages(messagesID, Number(DrslHipChatService.maxResults), vm.currentCase)
                .then(function(res){
                    vm.messages = res.data.items;
                    DrslHipChatService.magicMessageParser(vm.messages);
                }, function errorCallback(res) {
                    if(res.data.error){
                        var roomObject = {
                            name: messagesID,
                            topic: vm.currentCase.summary
                        }
                        DrslHipChatService.makeRoom(roomObject)
                        .then(function () {
                            getMessages();
                        })
                    }
                })
            }
            function scheduleMessages() {
                countdown(15);
                // vm.messageScheduler();
            }
            function countdown(time) {
                setTimeout(function () {
                    time = time-1;
                    if(time != 1){
                        countdown(time);
                    }
                }, 1000);
            }
            function sendMessage(){
                var messageObject = {
                    roomID: vm.currentCase.technology.name + vm.currentCase.id,
                    message: vm.messageToSend,
                    from: getCurrentUserName(),
                    message_format: 'text'
                }
                DrslHipChatService.sendMessage(messageObject)
                .then(function(res){
                    getMessages();
                    vm.messageToSend = '';
                }, function (res) {
                    console.log("MESSAGE ERROR", res);
                })
            }
            //Checks to see if a message in the message list is sent by the current user
            function isCurrentSender(displayName){
                return displayName == vm.currentUser.firstName + ' ' + vm.currentUser.lastName || displayName == vm.currentCase.user.login;
            }
            //Get's username of case creator for hipchat messages header
            function getUserName(){
                if(vm.currentCase.user.firstName == null){
                    return vm.currentCase.user.login;
                } else {
                    return vm.currentCase.user.firstName + ' ' + vm.currentCase.user.lastName;
                }
            }
            // Get's the current user's username, either login or firstName + lastName
            function getCurrentUserName(){
                if(vm.currentUser.firstName == null){
                    return vm.currentUser.login;
                } else {
                    return vm.currentUser.firstName + ' ' + vm.currentUser.lastName;
                }
            }
            /**
            * Checks to see if the provided index is less than or equal to the current step/status index.
            * @param step
            * @returns {boolean}
            */
            function passedStep(step) {
                // Get the current case's state/status index or set to -1
                var stepIndex = (vm.currentCase) ? StatusModel.getStatusIndex(vm.currentCase.status) : -1;

                return (step <= stepIndex );
            }

            // Listen for an 'openRating' event and trigger/call the dialog to open
            $scope.$on('openRating', function (event) {
                event.stopPropagation();
                vm.openRating();
            });

            // Listen for an 'openCaseAgreement' event and trigger/call the dialog to open
            $scope.$on('openCaseAgreement', function (event) {
                event.stopPropagation();
                vm.openCaseAgreement();
            });

            // Listen for an 'pauseOrResumeCasePolling' event and pause/resume the polling based on the data passed in.
            $scope.$on('pauseOrResumeCasePolling', function (event, data) {
                event.stopPropagation();
                vm.pausePollForCaseUpdates = data.pause;
            });

            // Cleanup the polling interval on destroy.
            $scope.$on('$destroy', function () {
                if (angular.isDefined(casePoll)) {
                    $interval.cancel(casePoll);
                    casePoll = undefined;
                }
            });

            // Call to initialize the controller.
            vm.init();
        }
    })();

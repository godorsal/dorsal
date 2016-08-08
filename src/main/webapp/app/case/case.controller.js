(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('CaseController', CaseController);

    CaseController.$inject = ['$scope', '$window', '$interval', '$timeout', 'CaseService', 'DrslRatingService', 'CaseDetailsService', 'EscalationFormService', 'ShareCaseService', 'CaseAgreementService', '$state', 'StatusModel', 'Rating', 'Expertbadge', 'DrslMetadata', 'Caseupdate', 'AttachmentModalService', 'DrslAttachFileService'];

    function CaseController($scope, $window, $interval, $timeout, CaseService, DrslRatingService, CaseDetailsService, EscalationFormService, ShareCaseService, CaseAgreementService, $state, StatusModel, Rating, Expertbadge, DrslMetadata, Caseupdate, AttachmentModalService, DrslAttachFileService) {
        var vm = this, casePoll;
        vm.init = init;
        vm.DrslMetadata = DrslMetadata;
        vm.pollForCaseUpdates = pollForCaseUpdates;
        vm.pausePollForCaseUpdates = false;
        vm.getHistory = getHistory;
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
        vm.badges = [];
        vm.expertBadges = [];
        vm.expertBadgeResources = [];
        vm.statusStates = [];
        vm.openCaseAgreement = openCaseAgreement;
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
        vm.experts = {};
        vm.showNotifications = false;
        vm.init();

        /**
        * Initialize the controller's data.
        */
        function init() {
            var getCurrentUser = (typeof(vm.currentUser.email) === 'undefined'),
            getStatusStates = (vm.statusStates.length === 0),
            getBadges = (vm.badges.length === 0);

            // Make a call to get the initial data.
            CaseService.getEntityData({'getCurrentUser': getCurrentUser, 'getStatusStates': getStatusStates, 'getBadges': getBadges}).then(function (data) {
                var i, currentCaseIndex = 0;

                if (data.badges) {
                    vm.badges = data.badges;
                }

                if (data.supportCase.length < 1) {
                    $state.go('concierge')
                } else {
                    vm.supportcases = data.supportCase.reverse();

                    if (vm.currentCase && vm.currentCase.id){
                        for (i=0; i<vm.supportcases.length; i++) {
                            if (vm.currentCase.id === vm.supportcases[i].id) {
                                currentCaseIndex = i;
                                break;
                            }
                        }
                    }

                    vm.setCurrentCase(vm.supportcases[currentCaseIndex]);
                    DrslAttachFileService.uploadAttachFileList(vm.supportcases[currentCaseIndex]);
                }

                if (data.identity) {
                    vm.currentUser = data.identity;
                }

                if (data.statusStates) {
                    vm.statusStates = data.statusStates;
                }

                if (!casePoll) {
                    vm.pollForCaseUpdates();
                }
                if (vm.currentCase.estimateLog) {
                  vm.estimateLogs = vm.currentCase.estimateLog.split('\n');
                }
            });

        }

        function pollForCaseUpdates() {
            casePoll = $interval(function () {
                if (!vm.pausePollForCaseUpdates){
                    vm.init();
                }
            }, vm.DrslMetadata.casePollingRateSeconds * 1000);
        }
        function getCaseUpdates(){
            vm.updates = [];
            Caseupdate.query(function(result){
                result.reverse().forEach(function(update){
                    if(update.supportcase.id === vm.currentCase.id){
                        if(update.updatetype.id == 2){
                            vm.detailedResolutions.push(update);
                        }
                        vm.updates.push(update)
                    }
                })
            })
        }
        /**
        * Call getExpert in CaseService and set the result on the vm for the given expert id.
        * @param expert
        */
        function getExpert(expert) {
            CaseService.getExpert(function (data) {
                var foundExpert = data.filter(function (o) {
                    return o.id == expert;
                })[0];

                if (foundExpert) {
                    vm.experts[expert] = foundExpert;
                }
            });
        }

        function getCaseExpertBadges() {
            CaseService.getExpertBadges(vm.currentCase.expertaccount.id).then(function(data){
                vm.expertBadges = data.badges;
                vm.expertBadgeResources = data.expertBadgeResources;
            });
        }

        function isCaseExpert(){
            var caseExpert = false;

            if (vm.currentCase && vm.currentCase.expertaccount && vm.currentUser.email) {
                caseExpert = (vm.currentCase.expertaccount.user.email === vm.currentUser.email);
            }

            return caseExpert;
        }

        /**
        * Get the current case.
        * @returns {Array}
        */
        function getCurrentCase() {
            var cases = [];

            if (vm.cases.length > 1) {
                cases = vm.cases.slice(0, 1);
            }

            return cases;
        }

        /**
        * Get the history cases as an array of case objects.
        * @returns {Array}
        */
        function getHistory() {
            var history = [];

            if (vm.cases.length > 1) {
                history = vm.cases.slice(1, vm.cases.length);
            }

            return history;
        }

        /**
        * Sets the currentCase reference to the given case object.
        * @param targetCase
        */
        function setCurrentCase(targetCase) {
            vm.currentCase = targetCase;
            getCaseExpertBadges();
            getCaseUpdates();
            $timeout(function () {
                $scope.$broadcast('currentCaseSet');
            }, 1);
        }

        /**
        * Opens the rating dialog.
        */
        function openRating() {
            if (StatusModel.checkCaseStatus(vm.currentCase.status, 'completed') && !vm.isCaseExpert()) {
                var modalInstance = DrslRatingService.open(vm.currentCase, vm.badges);

                modalInstance.result.then(function (data) {
                    var newRating = {
                        id: null,
                        dateRated: null,
                        score: data.score,
                        rateDetails: data.rateDetails,
                        ratingComments: data.ratingComments,
                        hasExpertExceeded: data.hasExpertExceeded,
                        supportcase: vm.currentCase
                    };

                    vm.currentCase.status = StatusModel.getState('closed');

                    updateExpertBadges(data.selectedBadges);
                    Rating.save(newRating);
                    vm.currentCase.$update();
                });

                modalInstance.opened.then(function(){
                    vm.pausePollForCaseUpdates = true;
                });

                modalInstance.closed.then(function(){
                    var i, badge;

                    vm.pausePollForCaseUpdates = false;

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
            badgesToUpdate = vm.expertBadgeResources.filter(function(expertBadgeResource){
                var found = false, i;

                for (i = 0; i< selectedBadges.length; i++) {
                    if (selectedBadges[i].id === expertBadgeResource.badge.id) {
                        expertBadgeResource.expertBadgeCount++;
                        found = true;
                        break;
                    }
                }

                return found;
            });

            // get the badges to add
            badgesToAdd = selectedBadges.filter(function(badge){
                var found = false, i;

                for (i = 0; i< vm.expertBadgeResources.length; i++) {
                    if (badge.id === vm.expertBadgeResources[i].badge.id) {
                        found = true;
                        break;
                    }
                }

                return !found;
            });

            // update badges
            for (i=0; i<badgesToUpdate.length; i++){
                badgesToUpdate[i].$update();
            }

            // add badges
            for (i=0; i<badgesToAdd.length; i++){
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
            var modalInstance = CaseDetailsService.open(vm.currentCase, vm.experts[vm.currentCase.expert]);

            modalInstance.result

            modalInstance.opened.then(function(){
                vm.pausePollForCaseUpdates = true;
            });

            modalInstance.closed.then(function(){
                vm.pausePollForCaseUpdates = false;
            });
        }

        function openEscalation() {
            if (!StatusModel.checkCaseStatus(vm.currentCase.status, 'closed')) {
                var modalInstance = EscalationFormService.open(vm.currentCase, vm.experts[vm.currentCase.expert]);

                modalInstance.opened.then(function(){
                    vm.pausePollForCaseUpdates = true;
                });

                modalInstance.closed.then(function(){
                    vm.pausePollForCaseUpdates = false;
                });
            }
        }

        function openShare() {
            var modalInstance = ShareCaseService.open(vm.currentCase, vm.experts[vm.currentCase.expert]);

            modalInstance.opened.then(function(){
                vm.pausePollForCaseUpdates = true;
            });

            modalInstance.closed.then(function(){
                vm.pausePollForCaseUpdates = false;
            });
        }
        function openAttachment() {
            var modalInstance = AttachmentModalService.open(vm.currentCase, vm.experts[vm.currentCase.expert]);

            modalInstance.opened.then(function(){
                vm.pausePollForCaseUpdates = true;
            });

            modalInstance.closed.then(function(){
                vm.pausePollForCaseUpdates = false;
            });
        }


        /**
        * Opens the chat dialog.
        */
        function openChat() {
            if (vm.passedStep(1)) {
                $window.open(vm.currentCase.chatRoom.link, '_blank');
            }
        }

        /**
        * Opens the Case Agreement dialog.
        */
        function openCaseAgreement() {
            if (!vm.isCaseExpert()){
                var modalInstance = CaseAgreementService.open(vm.currentCase, vm.currentCase.expert);

                modalInstance.result.then(function () {
                    vm.currentCase.isApproved = true;
                    vm.currentCase.status = StatusModel.getState('working');
                    vm.currentCase.estimateLog = (vm.currentCase.estimateLog) ? vm.currentCase.estimateLog : '';
                    vm.currentCase.estimateLog += 'ACCEPTED ' + new Date().toISOString().slice(0, 19).replace('T', ' ') + ' ' + vm.currentCase.estimateHours +  'hrs ' + vm.currentCase.estimateComment + '\n';
                    vm.currentCase.$update();
                });

                modalInstance.opened.then(function(){
                    vm.pausePollForCaseUpdates = true;
                });

                modalInstance.closed.then(function(){
                    vm.pausePollForCaseUpdates = false;
                });
            }
        }

        /**
        * Checks to see if the provided index is less than or equal to the current step/status index.
        * @param step
        * @returns {boolean}
        */
        function passedStep(step) {
            var stepIndex = StatusModel.getStatusIndex(vm.currentCase.status);

            return (step <= stepIndex );
        }

        $scope.$on('openRating', function (event) {
            event.stopPropagation();
            vm.openRating();
        });

        $scope.$on('openCaseAgreement', function (event) {
            event.stopPropagation();
            vm.openCaseAgreement();
        });

        $scope.$on('pauseOrResumeCasePolling', function (event, data) {
            event.stopPropagation();
            vm.pausePollForCaseUpdates = data.pause;
        });

        $scope.$on('$destroy', function() {
            if (angular.isDefined(casePoll)) {
                $interval.cancel(casePoll);
                casePoll = undefined;
            }
        });
    }
})();

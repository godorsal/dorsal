(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ConciergeController', ConciergeController);

    ConciergeController.$inject = ['$rootScope', '$scope', '$state', 'LoginService', 'Principal', 'ConciergeService', '$translate', '$http', 'Supportcase', 'Casetechnologyproperty', 'toastr', 'AttachmentModalService', 'DateUtils', 'CaseService', 'DrslNewCaseService', 'DrslMetadata', 'ExpertAccount', 'DrslUserFlowService', 'DrslHipChatService', '$window', '$sce', 'Product', 'Skill', 'ExpertAttribute', 'ExpertPool', 'ExpertPoolToExpert', 'Useraccount'];

    function ConciergeController($rootScope, $scope, $state, LoginService, Principal, ConciergeService, $translate, $http, Supportcase, Casetechnologyproperty, toastr, AttachmentModalService, DateUtils, CaseService, DrslNewCaseService, DrslMetadata, ExpertAccount, DrslUserFlowService, DrslHipChatService, $window, $sce, Product, Skill, ExpertAttribute, ExpertPool, ExpertPoolToExpert, Useraccount) {

        DrslUserFlowService.handleUserFlow();
        DrslUserFlowService.checkPaymentInformation();

        ExpertPool.query(function (res) {
            vm.expertGroups = res;
            vm.expertGroups.forEach(function (group) {
                group.experts = [];
                ExpertPoolToExpert.query({type: "expertpool", id: group.id}, function (res){
                    res.forEach(function (connection) {
                        group.experts.push(connection)
                    })
                })
            })
        })


        // Set the view model and view model properties/methods
        var vm = this;
        vm.technologyProperties = {};
        vm.technology = {};
        vm.issue = {};
        vm.messages = [];
        vm.checkingMessages = false;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.product = null;
        vm.errorMissingTech = $translate.instant('concierge.errors.missing.tech');
        vm.errorMissingIssue = $translate.instant('concierge.errors.missing.issue');
        vm.expertGroups = [];
        vm.errorMissingDescription = $translate.instant('concierge.errors.missing.description');
        vm.errorMissingAll = $translate.instant('concierge.errors.missing.all');
        vm.DrslMetadata = DrslMetadata;
        vm.DrslHipChatService = DrslHipChatService;
        vm.sendMessage = sendMessage;
        vm.checkMessages = checkMessages;
        vm.getMessages = getMessages;
        vm.selectTech = selectTech;
        vm.selectSkill = selectSkill;
        vm.removeSkill = removeSkill;
        vm.removeTechnology = removeTechnology;
        vm.addCustomSkill = addCustomSkill;
        vm.addCustomTechnology = addCustomTechnology;
        vm.parseInput = parseInput;
        vm.maxResults = '5';
        vm.selectedTechnologies = [];
        vm.selectedSkills = [];

        var productString = "";

        var groupString = "";

        Product.query(function (result) {
            vm.technologies = result;
            vm.techBank = [];
            result.forEach(function (tech) {
                vm.techBank.push(tech.name.toLowerCase())
            })
        })
        function parseInput() {
            var parseArray = vm.techInput.split(",");
            parseArray.forEach(function (word) {
                vm.techBank.forEach(function (tech, index) {
                    if(tech === word){
                        vm.selectTech(vm.technologies[index], index)
                        vm.techBank.splice(index, 1)
                    }
                })
            })
        }
        function selectTech(tech, index) {
            vm.selectedTechnologies.push(tech);
            vm.technologies.splice(index, 1);

        }
        function removeTechnology(tech, index) {
            vm.selectedTechnologies.splice(index, 1);
            if(tech.id){
                vm.technologies.unshift(tech);
            }
        }

        function selectSkill(skill, index) {
            vm.selectedSkills.push(skill);
            vm.skills.splice(index, 1);
        }
        function removeSkill(skill, index) {
            vm.selectedSkills.splice(index, 1);
            if(skill.id){
                vm.skills.push(skill);
            }
        }
        function addCustomSkill() {
            vm.selectedSkills.push({name:vm.customSkillInput});
            vm.customSkillInput = '';
        }
        function addCustomTechnology() {
            vm.selectedTechnologies.push({name:vm.customTechnologyInput});
            vm.customTechnologyInput = '';
        }
        Skill.query(function (result) {
            vm.skills = result;
        })
        ExpertAttribute.query(function (result) {
            vm.ExpertAttributes = [];
            result.forEach(function (attribute) {
                var attArr = attribute.name.split('-');
                if(attArr[attArr.length-1] === "RESIDENT"){
                    vm.ExpertAttributes.push(attribute)
                }
            })
        })

        // DrslHipChatService.clearRooms();
        DrslHipChatService.getCurrentUser();
        if(DrslHipChatService.currentRoom){
            vm.chatroom = DrslHipChatService.currentRoom;
        }
        vm.caseDetails = {
            summary: '',
            description: '',
            radios: []
        };
        vm.datePopup = {
            opened: false
        };
        vm.defaultDate = new Date();
        vm.defaultDate.setDate(vm.defaultDate.getDate() + 7);
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        vm.DrslUserFlowService = DrslUserFlowService;
        // vm methods
        vm.init = init;
        vm.submitForm = submitForm;
        vm.createCase = createCase;
        vm.openDatePopup = openDatePopup;
        vm.makeConciergeRoom = makeConciergeRoom;

        if(DrslHipChatService.waitingOnRoom){
            vm.conciergeChat = DrslHipChatService.currentRoom;
            vm.conciergechaturl = vm.conciergeChat.guest_access_url;
        }
        $rootScope.$on('roomDeletion', function(){
            vm.conciergechaturl = null;
            vm.checkingMessages = false;
        })

        /**
        * Creates (saves/updates) the case.
        * Called after the form is submitted and the user is authenticated.
        */
        Useraccount.query(function (res) {
            vm.currentUserAccount = res[0];
            if(vm.currentUserAccount.companyname){
                vm.userAttributes = vm.currentUserAccount.companyname.split(',');
                ExpertAccount.query({
                    param: "query",
                    options: "product:" + ":attribute:" + vm.userAttributes[0] + ":score:"
                }, function (expertaccounts) {
                    ExpertPool.query({
                        id: "admin"}, function (res) {
                            var allExpertGroups = res;
                            allExpertGroups.forEach(function (expertGroup) {
                                expertaccounts.forEach(function (expertAccount) {
                                    if(expertGroup.expertpoolowner.id === expertAccount.id){
                                        vm.expertGroups.push(expertGroup)
                                    }
                                })
                            })
                        })
                    });
                } else {
                    vm.userAttributes = [];
                }
            })
            // vm.userAttributes = vm.currentUserAccount.companyname.split(',');
            function createCase() {
                // Exit/Return if we already know we have errors
                // if (hasErrors()) {
                //     checkError();
                //     return;
                // }

                var brandNewCase = {};

                // brandNewCase.technology = vm.selectedTechnologies[0];

                var namedTechs = [];
                var namedSkills = [];
                vm.selectedTechnologies.forEach(function functionName(tech) {
                    namedTechs.push(tech.name)
                })
                vm.selectedSkills.forEach(function functionName(skill) {
                    namedSkills.push(skill.name)
                })


                if(vm.expertGroup){
                    var groupString = "Group:" + vm.expertGroup;
                }



                vm.technologyProperties = {
                    Other: "Product:" + namedTechs.join(",")
                    // Other: "Product:" + namedTechs.join(" ") + " " + skillString + attributeString
                }
                if(namedSkills.length > 0){
                    vm.technologyProperties.Other +=  "|Skill:" + namedSkills.join(",");
                    // var skillString = "Skill:" + namedSkills.join(",");
                } else {
                    vm.technologyProperties.Other +=  "|Skill:" + "None";

                }
                if(vm.expertRegion){
                    vm.technologyProperties.Other +=  "|Attribute:" + vm.expertRegion;
                    // var attributeString = "Attribute:" + vm.expertRegion + " ";
                } else {
                    var attributeString = "";
                }
                if(vm.expertGroup){
                    vm.technologyProperties.Other +=  "|Group:" + vm.expertGroup;
                }
                // brandNewCase.technology = vm.technology;

                brandNewCase.status = {code: "case_created_assigned_to-Expert", id: 1, name: "CREATED"};
                brandNewCase.statusmsg = 'Case Created';
                brandNewCase.expectedCompletionDate = DateUtils.convertDateTimeFromServer(vm.defaultDate);
                brandNewCase.summary = vm.caseDetails.summary;
                Supportcase.save(brandNewCase, onSaveSuccess, onSaveError)
            }

            function makeConciergeRoom(){
                if(!DrslHipChatService.currentUsername){
                    DrslHipChatService.currentUsername = $window.prompt("Please Enter your Name")
                    DrslHipChatService.currentUsername ? makeConciergeRoom(): '';
                } else {
                    DrslHipChatService.makeConciergeRoom()
                    .then(function(res){
                        DrslHipChatService.getRoom(res.data.id)
                        .then(function(res){
                            vm.conciergechaturl = res.data.guest_access_url;
                            vm.guestRoomID = res.data.id;
                            vm.chatroom = res.data
                            var messages = 0;
                            DrslHipChatService.waitForMessage(res.data, messages);
                            checkMessages();
                        })
                    })
                }
            }
            function sendMessage(){
                var messageObject = {
                    roomID: vm.guestRoomID,
                    message: vm.messageToSend,
                    from: DrslHipChatService.currentUsername,
                    message_format: 'text'
                }
                DrslHipChatService.sendMessage(messageObject)
                .then(function(res){
                    getMessages();
                    vm.messageToSend = '';
                })
            }
            function checkMessages() {
                if(DrslHipChatService.waitingOnRoom){
                    setTimeout(function () {
                        DrslHipChatService.getMessages(vm.guestRoomID, vm.maxResults)
                        .then(function(res){
                            vm.messages = res.data.items;
                            DrslHipChatService.magicMessageParser(vm.messages);
                            checkMessages();
                        })
                    }, 30 * 1000);
                }
            }
            function getMessages() {
                DrslHipChatService.getMessages(vm.guestRoomID, vm.maxResults)
                .then(function(res){
                    vm.messages = res.data.items;
                    DrslHipChatService.magicMessageParser(vm.messages);
                    if(vm.checkingMessages){
                        checkMessages();
                    }
                })
            }

            window.onbeforeunload = function (event) {
                if(DrslHipChatService.waitingOnRoom){
                    DrslHipChatService.deleteRoom(vm.guestRoomID)
                }
            }

            /**
            * The success callback for saving/updating a case.
            * @param result
            */
            var onSaveSuccess = function (result) {
                // DrslNewCaseService.setNewCase(result);

                DrslNewCaseService.setNewCaseId(result.id);

                // Loop through each tech property and save via an api call
                for (var key in vm.technologyProperties) {
                    if (vm.technologyProperties.hasOwnProperty(key)) {
                        var brandNewProperty = {};
                        brandNewProperty.technology = {
                            id: 1
                        };
                        // brandNewProperty.technology = vm.selectedTechnologies[0];
                        // brandNewProperty.technology = vm.technology;
                        brandNewProperty.supportcase = {};
                        brandNewProperty.supportcase.id = result.id;
                        brandNewProperty.propertyname = key;
                        brandNewProperty.propertyvalue = vm.technologyProperties[key];
                        Casetechnologyproperty.save(brandNewProperty, function (result) {
                            console.log("Result", result);
                        });
                    }
                }
                Supportcase.update({id: "expertmatch"}, result, function(res) {
                    console.log("REZULTS", res);
                })

                // Reset view model properties
                vm.technologyProperties = null;
                vm.technology = null;
                // vm.issue = null;

                var roomObject = {
                    // name: result.technology.name + result.id,
                    topic: result.summary,
                    expert: result.expertaccount.user.email
                }
                // DrslHipChatService.makeRoom(roomObject);

                // emit a 'dorsalApp:supportcaseUpdate' so the app can be aware of the change
                $scope.$emit('dorsalApp:supportcaseUpdate', result);
                // redirect to the case page
                $state.go('case')
            };

            /**
            * The error callback for saving/updating a case.
            */
            var onSaveError = function () {
                checkError()
            };

            /**
            * Checks to see if the user has provided all of the required bits of data.
            * Called before data is sent to the back-end
            * @returns {boolean}
            */
            function hasErrors() {
                return (Object.keys(vm.selectedTechnologies).length === 0 ||
                Object.keys(vm.selectedSkills).length === 0 ||
                vm.caseDetails.summary.length === 0);
            }
            // function hasErrors() {
            //     return (Object.keys(vm.technology).length === 0 ||
            //     Object.keys(vm.issue).length === 0 ||
            //     vm.caseDetails.summary.length === 0);
            // }

            /**
            * Check to see why we may have gotten an error from the back-end.
            * Display a toastr message if we were able to determine the missing data.
            */
            function checkError() {
                var messages = [];

                // If we don't have any of the required data, display a summary error message.
                if (Object.keys(vm.technology).length === 0 && Object.keys(vm.issue).length === 0 && vm.caseDetails.summary.length === 0) {
                    messages.push(vm.errorMissingAll);
                } else {
                    // No Issue message
                    if (Object.keys(vm.issue).length === 0) {
                        messages.push(vm.errorMissingIssue);
                    }

                    // No Tech message
                    if (Object.keys(vm.technology).length === 0) {
                        messages.push(vm.errorMissingTech);
                    }

                    // No Summary message
                    if (vm.caseDetails.summary.length === 0) {
                        messages.push(vm.errorMissingDescription);
                    }
                }

                // If we have any messages display them in a toastr message
                if (messages.length) {
                    toastr.warning(messages.join('<br/>'), {timeOut: 5000});
                }
            }

            /**
            * Initialize the controller's data.
            */
            function init() {
                // Make a call to get the initial data.
                ConciergeService.getEntityData().then(function (data) {
                    vm.caseDetails = data;

                    // Store a shortcut reference to the product object
                    vm.product = vm.selectedTechnologies[0];

                    // vm.product = vm.caseDetails.radios.filter(function (o) {
                    //     return o.id === 'product';
                    // })[0];

                });
            }

            /**
            * Submits the form, or opens the login dialog if the user isn't logged in.
            */
            function submitForm() {
                DrslUserFlowService.checkPaymentInformation();
                if(DrslUserFlowService.user.hasCC === false){
                    toastr.success($translate.instant('global.messages.info.missingDetailsWithLink'), {
                        timeOut: 0,
                        toastClass: 'toast drsl-user-flow-toast',
                        onTap: function () {
                            $state.go('settings');
                        }
                    });
                } else if(DrslUserFlowService.user.hasCC === true){
                    var messages = [];
                    if(!vm.caseDetails.summary){
                        messages.push(vm.errorMissingDescription);
                    }
                    if(!vm.selectedTechnologies.length){
                        messages.push(vm.errorMissingTech);
                    }
                    if (!vm.isAuthenticated()) {
                        LoginService.open();
                        $rootScope.$on('authenticationSuccess', function () {
                            Principal.identity().then(function () {
                                if(messages.length){
                                    toastr.warning(messages.join('<br/>'), {timeOut: 5000});
                                } else {
                                    vm.createCase();
                                }
                            })
                        })
                    } else {
                        Principal.identity().then(function () {
                            if(messages.length){
                                toastr.warning(messages.join('<br/>'), {timeOut: 5000});
                            } else {
                                vm.createCase();
                            }
                        })
                    }
                } else {
                    toastr.success($translate.instant('global.messages.info.missingDetails'), {
                        timeOut: 5000,
                        toastClass: 'toast drsl-user-flow-toast'
                    });
                }
            }


            /**
            * Sets the vm.datePopup.opened boolean, which toggles the date popup display.
            */
            function openDatePopup() {
                vm.datePopup.opened = true;
            }

            // Call to initialize the controller.
            vm.init();
        }
    })();

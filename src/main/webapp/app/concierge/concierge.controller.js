(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ConciergeController', ConciergeController);

    ConciergeController.$inject = ['$rootScope', '$scope', '$state', 'LoginService', 'Principal', 'ConciergeService', '$translate', '$http', 'Supportcase', 'Casetechnologyproperty', 'toastr', 'AttachmentModalService', 'DateUtils', 'CaseService', 'DrslNewCaseService', 'DrslMetadata', 'ExpertAccount'];

    function ConciergeController($rootScope, $scope, $state, LoginService, Principal, ConciergeService, $translate, $http, Supportcase, Casetechnologyproperty, toastr, AttachmentModalService, DateUtils, CaseService, DrslNewCaseService, DrslMetadata, ExpertAccount) {
        var vm = this;
        vm.init = init;
        vm.submitForm = submitForm;
        vm.createCase = createCase;
        vm.getCurrentUser = getCurrentUser;
        vm.startChat = startChat;
        // vm.openAttachment = openAttachment;
        vm.currentPlan = '';
        vm.selectPlan = selectPlan;
        vm.setClass = setClass;
        vm.updatePageTitle = updatePageTitle;
        vm.showChat = false;
        vm.isSaving = false;
        vm.chatName = '';
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.hasCases = false;
        vm.product = null;
        vm.errorMissingTech = $translate.instant('concierge.errors.missing.tech');
        vm.errorMissingIssue = $translate.instant('concierge.errors.missing.issue');
        vm.errorMissingDescription = $translate.instant('concierge.errors.missing.description');
        vm.errorMissingAll = $translate.instant('concierge.errors.missing.all');
        vm.DrslMetadata = DrslMetadata;

        vm.caseDetails = {
            summary: '',
            description: '',
            radios: []
        };
        vm.openDatePopup = openDatePopup;
        vm.datePopup = {
            opened: false
        };
        vm.defaultDate = new Date();
        vm.defaultDate.setDate(vm.defaultDate.getDate()+7);
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false
        };
        vm.currentUser = {};
        Principal.identity().then(function(account){
            if (account) {
                vm.currentUser = account;
            }
        })
        function getUser(user) {
            switch(user.login) {
                case 'system':
                return 1;
                break;
                case 'anonymoususer':
                return 2;
                break;
                case 'admin':
                return 3;
                break;
                case 'user':
                return 4;
                break;
            }
        }
        function hasCases(){
            var getCurrentUser = (typeof(vm.currentUser.email) === 'undefined');
            CaseService.getEntityData({'getCurrentUser': getCurrentUser}).then(function (data) {
                if(data.supportCase.length > 0){
                    vm.hasCases = true;
                } else {
                    vm.hasCases = false;
                }
            })
        }
        hasCases()
        vm.technologyProperties = {};
        vm.technology = {};
        vm.issue = {};
        function createCase(){
            // Exit/Return if we already know we have errors
            if (hasErrors()) {
                checkError();
                return;
            }

            var brandNewCase = {};
            brandNewCase.technology = vm.technology;
            brandNewCase.issue = vm.issue;
            brandNewCase.status = {code: "case_created_assigned_to-Expert", id: 1, name:"CREATED"};
            brandNewCase.id = null;
            brandNewCase.expectedresult = null;
            brandNewCase.chaturl = null;
            brandNewCase.user = {};
            brandNewCase.user.id = getUser(vm.currentUser);
            brandNewCase.etacompletion = "4 hours";
            brandNewCase.statusmsg = 'Case Created';
            brandNewCase.expectedCompletionDate = DateUtils.convertDateTimeFromServer(vm.defaultDate);
            brandNewCase.summary = vm.caseDetails.summary;
            vm.isSaving = true;
            if (brandNewCase.id !== null) {
                Supportcase.update(brandNewCase, onSaveSuccess, onSaveError);
            } else {
                Supportcase.save(brandNewCase, onSaveSuccess, onSaveError);
            }
        }
        var onSaveSuccess = function (result) {
            DrslNewCaseService.setNewCaseId(result.id);
            for (var key in vm.technologyProperties) {
                if (vm.technologyProperties.hasOwnProperty(key)) {
                    var brandNewProperty = {};
                    brandNewProperty.technology = vm.technology;
                    brandNewProperty.supportcase = {};
                    brandNewProperty.supportcase.id = result.id;
                    brandNewProperty.propertyname = key;
                    brandNewProperty.propertyvalue = vm.technologyProperties[key];
                    Casetechnologyproperty.save(brandNewProperty);
                }
            }
            vm.technologyProperties = null;
            vm.technology = null;
            vm.issue = null;
            vm.isSaving = false;
            $scope.$emit('dorsalApp:supportcaseUpdate', result);
            // openAttachment(result)
            $state.go('case')
        };
        // $rootScope.$on('doneUploading', function(){
        //     $state.go('case');
        // })
        var onSaveError = function (err) {
            vm.isSaving = false;
            checkError()
        };

        function hasErrors() {
            return (Object.keys(vm.technology).length === 0 ||
            Object.keys(vm.issue).length === 0 ||
            vm.caseDetails.summary.length === 0);
        }
        function checkError(){
            var messages = [];

            if (Object.keys(vm.technology).length === 0 && Object.keys(vm.issue).length === 0 && vm.caseDetails.summary.length === 0) {
                messages.push(vm.errorMissingAll);
            } else {
                if(Object.keys(vm.issue).length === 0){
                    messages.push(vm.errorMissingIssue);
                }

                if(Object.keys(vm.technology).length === 0){
                    messages.push(vm.errorMissingTech);
                }

                if(vm.caseDetails.summary.length === 0){
                    messages.push(vm.errorMissingDescription);
                }
            }

            if (messages.length) {
                toastr.warning(messages.join('<br/>'), {timeOut: 5000});
            }
        }
        function getCurrentUser(){
            Principal.identity().then(function(account) {
                return account
            });
        }
        /**
        * Initialize the controller's data.
        */
        function init(){
            vm.pageTitle = '';

            // Make a call to get the initial data.
            ConciergeService.getEntityData().then(function(data){
                vm.caseDetails = data;

                // Store a shortcut reference to the product object
                vm.product = vm.caseDetails.radios.filter(function (o) {
                    return o.id === 'product';
                })[0];
            });

            vm.updatePageTitle();
        }
        /**
        * Updates the page title to match the params *type* data
        */
        function updatePageTitle () {
            switch ($state.params.type) {
                case 'incident':
                vm.pageTitle = $translate.instant('concierge.pageTitles.incident');
                vm.caseDetails.radios[0].selectedValue = '4 hrs';
                break;
                case 'pro-active':
                vm.pageTitle = $translate.instant('concierge.pageTitles.proActive');
                vm.caseDetails.radios[0].selectedValue = 'this week';
                break;
                case 'on-demand':
                vm.pageTitle = $translate.instant('concierge.pageTitles.onDemand');
                vm.caseDetails.radios[0].selectedValue = '1 day';
                break;
                default:
                vm.pageTitle = $translate.instant('concierge.pageTitles.connect');
                break;
            }
        }
        // function openAttachment(newCase) {
        //     var modalInstance = AttachmentModalService.open(newCase);
        // }
        /**
        * Submits the form, or opens the login dialog if the user isn't logged in.
        */
        function submitForm() {
            if (!vm.isAuthenticated()) {
                LoginService.open();
                $rootScope.$on('authenticationSuccess', function(){
                    Principal.identity().then(function(account){
                        vm.currentUser = account;
                        vm.createCase();
                    })
                })
            } else {
                Principal.identity().then(function(account){
                    vm.currentUser = account;
                    vm.createCase();
                })
            }
        }

        /**
        * Toggles the chat display if the user provided a chat name.
        * @param event
        */
        function startChat(event) {
            event.preventDefault();
            // if (vm.chatName){
            vm.showChat = true;
            // }
        }
        function selectPlan(tier){
            vm.currentPlan = tier;
        }
        function setClass(tier){
            if(vm.currentPlan == tier){
                return 'selectedPlan';
            } else {
                return 'plan';
            }
        }
        function openDatePopup() {
            vm.datePopup.opened = true;
        }
        // Call to initialize the controller.
        vm.init();
    }
})();

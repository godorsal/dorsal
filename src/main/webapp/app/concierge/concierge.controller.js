(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ConciergeController', ConciergeController);

    ConciergeController.$inject = ['$rootScope', '$scope', '$state', 'LoginService', 'Principal', 'ConciergeService', '$translate', '$http', 'Supportcase', 'Casetechnologyproperty'];

    function ConciergeController($rootScope, $scope, $state, LoginService, Principal, ConciergeService, $translate, $http, Supportcase, Casetechnologyproperty) {
        var vm = this;
        vm.init = init;
        vm.submitForm = submitForm;
        vm.createCase = createCase;
        vm.getCurrentUser = getCurrentUser;
        vm.startChat = startChat;
        vm.currentPlan = '';
        vm.selectPlan = selectPlan;
        vm.setClass = setClass;
        vm.updatePageTitle = updatePageTitle;
        vm.showChat = false;
        vm.isSaving = false;
        vm.chatName = '';
        vm.isAuthenticated = Principal.isAuthenticated;
        $scope.checkAuth = Principal.isAuthenticated;
        vm.product = null;
        vm.caseDetails = {
            summary: '',
            description: '',
            radios: []
        };
        vm.placeholderExpert = {
            activated: true,
            email: "system@localhost",
            firstName: "System",
            id:1,
            langKey: "en",
            lastName: "System",
            login: "system",
            resetDate: null,
            resetKey: null
        }
        vm.technologyProperties = {};
        vm.technology = {};
        vm.issue = {};
        function createCase(){
            var brandNewCase = {};
            brandNewCase.technology = vm.technology;
            brandNewCase.issue = vm.issue;
            brandNewCase.status = {code: "case_created_assigned_to-Expert", id: 1, name:"CREATED"};
            brandNewCase.id = null;
            brandNewCase.expectedresult = null;
            brandNewCase.chaturl = null;
            // brandNewCase.user = vm.getCurrentUser();
            brandNewCase.user = {};
            brandNewCase.expert = vm.placeholderExpert;
            // Principal.identity().then(function(account) {
            //     brandNewCase.user = account;
            // });
            brandNewCase.user.id = 1;
            brandNewCase.etacompletion = "4 hours";
            brandNewCase.statusmsg = 'Case Created';
            brandNewCase.datecreated = new Date();
            brandNewCase.datelastupdate = new Date();
            // brandNewCase.datecreated = Date.now();
            // brandNewCase.datelastupdate = Date.now();
            brandNewCase.summary = vm.caseDetails.summary;
            vm.isSaving = true;
            if (brandNewCase.id !== null) {
                Supportcase.update(brandNewCase, onSaveSuccess, onSaveError);
            } else {
                console.log(brandNewCase);
                Supportcase.save(brandNewCase, onSaveSuccess, onSaveError);
            }
        }
        var onSaveSuccess = function (result) {
            for (var key in vm.technologyProperties) {
                if (vm.technologyProperties.hasOwnProperty(key)) {
                    var brandNewProperty = {};
                    brandNewProperty.technology = vm.technology;
                    brandNewProperty.supportcase = result;
                    brandNewProperty.propertyname = key;
                    brandNewProperty.propertyvalue = vm.technologyProperties[key];
                    Casetechnologyproperty.save(brandNewProperty);
                }
            }
            vm.isSaving = false;
            $scope.$emit('dorsalApp:supportcaseUpdate', result);
            $state.go('case');
        };
        var onSaveError = function (err) {
            vm.isSaving = false;
            checkError()
        };
        function checkError(){
            if (Object.keys(vm.technology).length === 0 && Object.keys(vm.issue).length === 0) {
                alert('You forgot the technology and the issue')
            } else if(Object.keys(vm.technology).length === 0){
                alert('You forgot the technology')
            } else if(Object.keys(vm.issue).length === 0){
                alert('You forgot the issue')
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

            console.log(vm.getCurrentUser());
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

        /**
        * Submits the form, or opens the login dialog if the user isn't logged in.
        */
        function submitForm() {
            if (!vm.isAuthenticated()) {
                LoginService.open()
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
        // Call to initialize the controller.
        vm.init();
    }
})();

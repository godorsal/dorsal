(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ConciergeController', ConciergeController);

    ConciergeController.$inject = ['$scope', '$state', 'LoginService', 'Principal', 'ConciergeService', '$translate', '$http'];

    function ConciergeController($scope, $state, LoginService, Principal, ConciergeService, $translate, $http) {
        var vm = this;

        vm.init = init;
        vm.submitForm = submitForm;
        vm.startChat = startChat;
        vm.updatePageTitle = updatePageTitle;
        vm.showChat = false;
        vm.chatName = '';
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.product = null;
        vm.caseDetails = {
            summary: '',
            description: '',
            radios: []
        };

        /**
         * Initialize the controller's data.
         */
        function init(){
            vm.pageTitle = '';

            // Make a call to get the initial data.
            ConciergeService.get(function(data){
                vm.caseDetails = data[0] || [];

                // Store a shortcut reference to the product object
                vm.product = vm.caseDetails.radios.filter(function (o) {
                    return o.id === 'product';
                })[0];

                vm.updatePageTitle();
            });
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
            if (vm.isAuthenticated()) {
                $state.go('case');
            } else {
                LoginService.open();
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

        // Call to initialize the controller.
        vm.init();
    }
})();

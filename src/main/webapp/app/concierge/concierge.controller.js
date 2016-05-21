(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ConciergeController', ConciergeController);

    ConciergeController.$inject = ['$scope', '$state', 'LoginService', 'Principal', 'ConciergeService'];

    function ConciergeController($scope, $state, LoginService, Principal, ConciergeService) {
        var vm = this;

        vm.init = init;
        vm.submitForm = submitForm;
        vm.startChat = startChat;
        vm.productDetailInputComplete = false;
        vm.showChat = false;
        vm.chatName = '';
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.product = null;
        vm.caseDetails = {
            summary: '',
            description: '',
            radios: []
        };

        // Watch for changes on the product's selected value property and clear out incidentTypeSelections on change
        $scope.$watch('vm.product.selectedValue', function(newValue, oldValue){
            if (oldValue && oldValue !== newValue) {
                vm.product.incidentTypeSelections = [];
                vm.productDetailInputComplete = false;
            }
        });

        vm.init();

        function init(){
            vm.pageTitle = '';

            ConciergeService.get(function(data){
                vm.caseDetails = data[0] || [];

                // Store a shortcut reference to the product object
                vm.product = vm.caseDetails.radios.filter(function (o) {
                    return o.id === 'product';
                })[0];
            });

            switch ($state.params.type) {
                case 'incident':
                    vm.pageTitle = 'incident support';
                    vm.caseDetails.radios[0].selectedValue = '1 day';
                    break;
                case 'pro-active':
                    vm.pageTitle = 'pro-active support';
                    vm.caseDetails.radios[0].selectedValue = 'Immediate';
                    break;
                case 'on-demand':
                    vm.pageTitle = 'on-demand pros';
                    vm.caseDetails.radios[0].selectedValue = '4 hrs';
                    break;
                default:
                    vm.pageTitle = 'connect now';
                    break;
            }
        }

        function submitForm() {
            if (vm.isAuthenticated()) {
                $state.go('case');
            } else {
                LoginService.open();
            }
        }

        function startChat(event) {
            event.preventDefault();
            if (vm.chatName){
                vm.showChat = true;
            }
        }
    }
})();

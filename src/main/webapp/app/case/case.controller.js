(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseController', CaseController);

    CaseController.$inject = ['$scope', '$state', 'CaseService'];

    function CaseController($scope, $state, CaseService) {
        var vm = this;
        vm.init = init;
        vm.getHistory = getHistory;
        vm.getCurrentCase = getCurrentCase;
        vm.init();

        vm.cases = [];

        vm.currentUser = {
            id: 'userForeignKey',
            name: 'Joe Doe'
        };

        vm.placeHolderExpert = {
            id: 'expertForeignKey',
            name: 'John Smith',
            picture: 'content/images/John-Smith.jpg',
            contact: {
                email: 'jsmith@support.com',
                phone: '(707) 555-1212',
                skype: 'minatourpower'
            },
            score: 69,
            stars: 4,
            badges: [
                'fast',
                'efficient',
                'expert'
            ]
        };

        /**
         * Initialize the controller's data.
         */
        function init(){
            // Make a call to get the initial data.
            CaseService.get(function(data){
                var i, cases, casesLength, currentCase, ecount = {count:0}, cleanCases = [];
                cases = data || [];
                casesLength = cases.length;

                // Loop through all the cases that came back with the service data
                for (i =0; i < casesLength; i++){
                    currentCase = cases[i];

                    // Only continue if the current user matches the case user
                    if (currentCase.user === vm.currentUser.id) {
                        // Try to find the associated expert data
                        currentCase.expert = vm.placeHolderExpert;

                        // Update case's date so we can display and sort on it
                        currentCase.lastUpdate = new Date(currentCase.lastUpdated);

                        // Update the case's username
                        currentCase.user = vm.currentUser.name;

                        // Add the case to the cleanCases array
                        cleanCases.push(currentCase);
                    }
                }

                // update the controller's cases
                vm.cases = cleanCases;
            });
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
    }
})();

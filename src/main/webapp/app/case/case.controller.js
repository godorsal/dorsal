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
        vm.cases = [];
        vm.currentUser = {
            id: 'userForeignKey',
            name: 'Joe Doe'
        };
        vm.experts = {};
        vm.init();

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
                        if (!vm.experts[currentCase.expert]) {
                            vm.experts[currentCase.expert] = {};
                        }

                        // Update case's date so we can display and sort on it
                        currentCase.lastUpdate = new Date(currentCase.lastUpdated);

                        // Update the case's username
                        currentCase.user = vm.currentUser.name;

                        // Add the case to the cleanCases array
                        cleanCases.push(currentCase);
                    }
                }

                // Only request unique experts, to help avoid redundant calls.
                for (var expert in vm.experts) {
                    if (vm.experts.hasOwnProperty(expert)){
                        getExpert(expert);
                    }
                }

                // update the controller's cases
                vm.cases = cleanCases;
            });
        }

        /**
         * Call getExpert in CaseService and set the result on the vm for the given expert id.
         * @param expert
         */
        function getExpert(expert){
            CaseService.getExpert(function(data){
                vm.experts[expert] = data[0];
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

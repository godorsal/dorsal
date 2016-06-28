(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseController', CaseController);

    CaseController.$inject = ['$scope', '$window', 'CaseService', 'DrslRatingService', 'CaseDetailsService', 'EscalationFormService', 'ShareCaseService', 'CaseAgreementService', 'Supportcase'];

    function CaseController($scope, $window, CaseService, DrslRatingService, CaseDetailsService, EscalationFormService, ShareCaseService, CaseAgreementService, Supportcase) {
        var vm = this;
        vm.init = init;
        vm.getHistory = getHistory;
        vm.getCurrentCase = getCurrentCase;
        vm.setCurrentCase = setCurrentCase;
        vm.openRating = openRating;
        vm.openDetails = openDetails;
        vm.openEscalation = openEscalation;
        vm.openShare = openShare;
        vm.passedStep = passedStep;
        vm.openChat = openChat;
        vm.openCaseAgreement = openCaseAgreement;
        vm.cases = [];
        vm.currentCase = {};
        vm.status = {
            created: 'case.details.status.created',
            assigned: 'case.details.status.assigned',
            working: 'case.details.status.working',
            resolved: 'case.details.status.resolved',
            completed: 'case.details.status.completed'
        };
        vm.currentUser = {
            id: 'userForeignKey',
            name: 'Joe Doe'
        };
        vm.experts = {};
        vm.loadAll = function() {
            Supportcase.query(function(result) {
                // vm.cases = result;
                vm.supportcases = result;
                vm.setCurrentCase(result[0]);
                console.log(result);
            });
        };
        vm.init();

        /**
         * Initialize the controller's data.
         */
        function init() {
            vm.loadAll()
            // Make a call to get the initial data.
            CaseService.get(function (data) {
                var i, cases, casesLength, currentCase, cleanCases = [];
                cases = data || [];
                casesLength = cases.length;

                // Loop through all the cases that came back with the service data
                for (i = 0; i < casesLength; i++) {
                    currentCase = cases[i];

                    // Only continue if the current user matches the case user
                    if (currentCase.user === vm.currentUser.id) {
                        // Try to find the associated expert data
                        if (!vm.experts[currentCase.expert]) {
                            vm.experts[currentCase.expert] = {};
                        }

                        // Update the case's username
                        currentCase.user = vm.currentUser.name;

                        // Add the case to the cleanCases array
                        cleanCases.push(currentCase);
                    }
                }

                // Only request unique experts, to help avoid redundant calls.
                for (var expert in vm.experts) {
                    if (vm.experts.hasOwnProperty(expert)) {
                        getExpert(expert);
                    }
                }

                // update the controller's cases
                vm.cases = cleanCases;
                // vm.setCurrentCase(cleanCases[0]);
            });
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
        }

        /**
         * Opens the rating dialog.
         */
        function openRating() {
            if (vm.currentCase.status === 'completed') {
                var modalInstance = DrslRatingService.open(vm.currentCase);

                modalInstance.result.then(function () {
                    vm.currentCase.status = 'closed';
                });
            }
        }

        /**
         * Opens the case details dialog.
         */
        function openDetails() {
            var modalInstance = CaseDetailsService.open(vm.currentCase, vm.experts[vm.currentCase.expert]);

            modalInstance.result.then(function (result) {
                // console.log(result);
            });
        }

        function openEscalation() {
            if (vm.currentCase.status === 'working') {
                var modalInstance = EscalationFormService.open(vm.currentCase, vm.experts[vm.currentCase.expert]);
            }
        }

        function openShare() {
            var modalInstance = ShareCaseService.open(vm.currentCase, vm.experts[vm.currentCase.expert]);
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
            if (vm.currentCase.status === 'estimated') {
                var modalInstance = CaseAgreementService.open(vm.currentCase, vm.experts[vm.currentCase.expert]);

                modalInstance.result.then(function () {
                    vm.currentCase.status = 'working';
                });
            }
        }

        /**
         * Checks to see if the provided index is less than or equal to the current step/status index.
         * @param step
         * @returns {boolean}
         */
        function passedStep(step) {
            var stepIndex = 0;

            if (vm.currentCase.status == 'closed') {
                stepIndex = 4;
            } else if (vm.currentCase.status == 'completed') {
                stepIndex = 3;
            } else if (vm.currentCase.status == 'working') {
                stepIndex = 2;
            } else if (vm.currentCase.status == 'estimated') {
                stepIndex = 1;
            }

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
    }
})();

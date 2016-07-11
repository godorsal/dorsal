(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseController', CaseController);

    CaseController.$inject = ['$scope', '$window', 'CaseService', 'DrslRatingService', 'CaseDetailsService', 'EscalationFormService', 'ShareCaseService', 'CaseAgreementService', 'Supportcase', '$state', 'DrslMetadata', 'StatusModel', 'ExpertAccount', 'Rating'];

    function CaseController($scope, $window, CaseService, DrslRatingService, CaseDetailsService, EscalationFormService, ShareCaseService, CaseAgreementService, Supportcase, $state, DrslMetadata, StatusModel, ExpertAccount, Rating) {
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
        vm.isCaseExpert = isCaseExpert;
        vm.expertUser = {};
        vm.statusStates = [];
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
        vm.init();

        /**
         * Initialize the controller's data.
         */
        function init() {
            ExpertAccount.query(function(result){
                vm.expertUser = result[0].user;
            });

            // Make a call to get the initial data.
            Supportcase.query(function(result) {
                if(result.length < 1){
                    $state.go('concierge')
                } else {
                    vm.supportcases = result.reverse();
                    vm.setCurrentCase(result[0]);
                }
            });

            StatusModel.getStates().then(function(data){
                vm.statusStates = data;
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

        function isCaseExpert(){
            var caseExpert = false;

            if (vm.currentCase && vm.currentCase.expert && vm.expertUser && vm.expertUser.id) {
                caseExpert = (vm.currentCase.expert.id === vm.expertUser.id);
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
        }

        /**
         * Opens the rating dialog.
         */
        function openRating() {
            if (StatusModel.checkCaseStatus(vm.currentCase.status, 'completed') && !vm.isCaseExpert()) {
                var modalInstance = DrslRatingService.open(vm.currentCase);

                modalInstance.result.then(function (data) {
                    var newRating = {
                        id: null,
                        dateRated: null,
                        score: data.combinedAverage,
                        supportcase: vm.currentCase
                    };

                    vm.currentCase.status = StatusModel.getState('closed');

                    Rating.save(newRating);
                    vm.currentCase.$update();
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
            if (StatusModel.checkCaseStatus(vm.currentCase.status, 'working') && !vm.isCaseExpert()) {
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
            if (!vm.isCaseExpert()){
                var modalInstance = CaseAgreementService.open(vm.currentCase, vm.currentCase.expert);

                modalInstance.result.then(function () {
                    vm.currentCase.isApproved = true;
                    vm.currentCase.status = StatusModel.getState('working');
                    vm.currentCase.$update();
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
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseDetails', caseDetails);

    function caseDetails($translate, $locale, tmhDynamicLocale, RatingService) {
        var directive = {
            restrict: 'E',
            scope:  {
                case: '=',
                status: '=',
                history: '@',
            },
            templateUrl: 'app/case/case-details.directive.html',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.rated = false;
            scope.caseIndex = 0;
            scope.statusOptions = [
                {
                    label: 'Created',
                    value: 'created'
                },
                {
                    label: 'Assigned',
                    value: 'assigned'
                },
                {
                    label: 'Working',
                    value: 'working'
                },
                {
                    label: 'Resolved',
                    value: 'resolved'
                },
                {
                    label: 'Completed',
                    value: 'completed'
                }
            ];

            scope.rate = function(){
                var modalInstance = RatingService.open();

                modalInstance.result.then(function (result) {
                    scope.rated = result.rated;
                    scope.case.status = 'completed';
                });
            };

            scope.passedStep = function(step){
                var stepIndex = 0;

                if (scope.case.status == 'completed') {
                    stepIndex = 4;
                } else if (scope.case.status == 'resolved') {
                    stepIndex = 3;
                } else if (scope.case.status == 'working') {
                    stepIndex = 2;
                } else if (scope.case.status == 'assigned') {
                    stepIndex = 1;
                }

                return (step <= stepIndex );
            };

            scope.cycleStatus = function(){
                if (scope.caseIndex < scope.statusOptions.length - 1) {
                    scope.caseIndex ++;
                } else {
                    scope.caseIndex = 0;
                }

                scope.case.status = scope.statusOptions[scope.caseIndex].value;

                if (scope.case.status === 'resolved') {
                    scope.rate();
                }
            };
        }
    }
})();

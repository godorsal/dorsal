(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseSummary', caseSummary);

    function caseSummary($translate, $locale, tmhDynamicLocale, $sce) {
        var directive = {
            restrict: 'E',
            scope: {
                case: '=',
                expert: '=',
                status: '=',
                passedStep: '=',
                history: '@'
            },
            templateUrl: 'app/case/case-summary.directive.html',
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
                    label: 'Estimated',
                    value: 'estimated',
                    template: 'app/case/agree-to-estimate-button.directive.html'
                },
                {
                    label: 'Working',
                    value: 'working'
                },
                {
                    label: 'Completed',
                    value: 'completed',
                    template: 'app/case/rate-expert-button.directive.html'

                },
                {
                    label: 'Closed',
                    value: 'closed'
                }
            ];

            scope.agreeToEstimate = function () {
            };

            scope.rateExpert = function() {
                scope.$emit('openRating');
            };

            scope.cycleStatus = function () {
                if (scope.caseIndex < scope.statusOptions.length - 1) {
                    scope.caseIndex++;
                } else {
                    scope.caseIndex = 0;
                }

                scope.case.status = scope.statusOptions[scope.caseIndex].value;
            };
        }
    }
})();

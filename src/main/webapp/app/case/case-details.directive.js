(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseSummary', caseSummary);

    function caseSummary($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'E',
            scope: {
                case: '=',
                expert: '=',
                status: '=',
                passedStep: '=',
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
                    label: 'Complete',
                    value: 'resolved'
                },
                {
                    label: 'Closed',
                    value: 'completed'
                }
            ];

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

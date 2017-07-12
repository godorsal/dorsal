(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseEstimate', caseEstimate);

    caseEstimate.$inject = ['DrslMetadata'];

    function caseEstimate(DrslMetadata) {
        var directive = {
            restrict: 'E',
            scope: {
                hours: '@',
                displayByTime: '@',
                estimate: '@'
            },
            template: '<span ng-hide="displayByTime" translate="case.details.estimateTotal" translate-values="{total:DrslMetadata.getTotalForRateAtHours(hours), hours:hours, rate:DrslMetadata.expertRate}"></span>' +
                        '<span ng-show="displayByTime" translate="case.details.timeOnCaseTotal" translate-values="{total:DrslMetadata.getTotalForRateAtHours(hours), hours:hours, rate:DrslMetadata.expertRate}"></span>' + '<span ng-show="estimate"> /Est. {{estimate}}hrs</span>',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.DrslMetadata = DrslMetadata;
        }
    }
})();

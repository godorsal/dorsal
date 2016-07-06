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
                hours: '@'
            },
            template: '<span translate="case.details.estimateTotal" translate-values="{total:DrslMetadata.getTotalForRateAtHours(hours), hours:hours, rate:DrslMetadata.expertRate}"></span>',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.DrslMetadata = DrslMetadata;
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseSummary', caseSummary);

    function caseSummary($translate, $locale, tmhDynamicLocale, $sce, DrslMetadata, StatusModel) {
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
            scope.DrslMetadata = DrslMetadata;
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
                    value: 'working',
                    template: 'app/case/agree-to-estimate-button.directive.html'
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
                scope.$emit('openCaseAgreement');
            };

            scope.rateExpert = function() {
                scope.$emit('openRating');
            };

            scope.cycleStatus = function () {
                scope.caseIndex = StatusModel.getStatusIndex(scope.case.status);

                if (scope.caseIndex < scope.statusOptions.length - 1) {
                    scope.caseIndex++;
                } else {
                    scope.caseIndex = 0;
                }

                switch (scope.caseIndex) {
                    case 0:
                        break;
                    case 1:
                        scope.case.estimateHours = 4;
                        scope.case.timeOnCase = 0;
                        break;
                    case 2:
                        scope.case.isApproved = true;
                        break;
                    case 3:
                        scope.case.timeOnCase = 3;
                        break;
                    case 4:
                        break;
                }


                scope.case.status = StatusModel.getState(scope.statusOptions[scope.caseIndex].value);
            };

            scope.displayPopover = function (statusValue){
                var open = false, workingStatus = false;

                if (scope.case && scope.case.status){
                    workingStatus = StatusModel.checkCaseStatus(scope.case.status, 'working');

                    if (statusValue === scope.case.status.name.toLowerCase() && workingStatus && !scope.case.isApproved){
                        open = true;
                    } else if (!workingStatus && statusValue === scope.case.status.name.toLowerCase()){
                        open = true;
                    }
                }

                return open;
            };
        }
    }
})();

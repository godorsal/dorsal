(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseProfessionalForm', caseProfessionalForm);

    caseProfessionalForm.$inject = ['StatusModel'];

    function caseProfessionalForm(StatusModel) {
        var directive = {
            restrict: 'E',
            scope:  {
                expert: '=',
                case: '='
            },
            templateUrl: 'app/case/case-professional-form.directive.html',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.estimateChange = false;
            scope.lastEstimate = 0;

            scope.submit = function () {
                if (StatusModel.checkCaseStatus(scope.case.status, 'created') && scope.case.estimateHours) {
                    scope.case.status = StatusModel.getState('estimated');
                }

                if (scope.estimateChange) {
                    scope.case.isApproved = false;
                }

                scope.case.$update();
            };

            scope.$watch('case.estimateHours', function(newValue, oldValue) {
                if (newValue && !oldValue && scope.lastEstimate === 0) {
                    scope.lastEstimate = newValue;
                } else if (newValue && oldValue) {
                    scope.estimateChange = (newValue > scope.lastEstimate);
                }
            });
        }
    }
})();

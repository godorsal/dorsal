(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseProfessionalForm', caseProfessionalForm);

    caseProfessionalForm.$inject = ['StatusModel', 'toastr'];

    function caseProfessionalForm(StatusModel, toastr) {
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
            scope.resolved = false;

            scope.submit = function () {
                if (StatusModel.checkCaseStatus(scope.case.status, 'created') && scope.case.estimateHours) {
                    scope.case.status = StatusModel.getState('estimated');
                }

                if (scope.estimateChange) {
                    scope.case.isApproved = false;
                }

                if (scope.case.isApproved && scope.resolved && StatusModel.checkCaseStatus(scope.case.status, 'working')) {
                    scope.case.status = StatusModel.getState('completed');
                }
                scope.case.$update(caseUpdateSuccess, caseUpdateError);
                function caseUpdateSuccess(){
                    toastr.success('This case has been updated', 'Success');
                    scope.$emit('pauseOrResumeCasePolling', {'pause': false});
                }
                function caseUpdateError(error){
                    toastr.error('The case has failed to update.<br/> Please report the error and try again.', 'Error');
                }
            };

            scope.fieldTouched = function () {
                scope.$emit('pauseOrResumeCasePolling', {'pause': true});
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

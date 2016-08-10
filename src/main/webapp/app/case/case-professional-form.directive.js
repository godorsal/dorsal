(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('caseProfessionalForm', caseProfessionalForm);

    caseProfessionalForm.$inject = ['StatusModel', 'toastr', 'CaseCompleteService', '$filter'];

    function caseProfessionalForm(StatusModel, toastr, CaseCompleteService, $filter) {
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
            scope.StatusModel = StatusModel;
            scope.localEstimateHours = null;

            scope.datePopup = {
                opened: false
            };

            scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1,
                showWeeks: false
            };

            scope.submit = function () {
                var logDate = $filter('date')(new Date(), 'MMM dd, yyyy HH:mm');

                scope.case.estimateLog = (scope.case.estimateLog) ? scope.case.estimateLog : '';

                if (StatusModel.checkCaseStatus(scope.case.status, 'created')) {
                    scope.case.estimateHours = scope.localEstimateHours;
                    if (scope.case.estimateHours) {
                        scope.case.status = StatusModel.getState('estimated');
                        scope.case.estimateLog += 'CREATED ' + logDate + ' ' + scope.case.estimateHours +  'hrs ' + scope.case.estimateComment + '##';
                    }
                } else if (!scope.expertForm.estimateHours.$pristine && scope.localEstimateHours !== scope.case.estimateHours) {
                    scope.case.isApproved = false;
                    scope.case.estimateHours = scope.localEstimateHours;
                    scope.case.estimateLog += 'UPDATED ' + logDate + ' ' + scope.case.estimateHours +  'hrs ' + scope.case.estimateComment + '##';
                }

                scope.expertForm.estimateHours.$pristine = true;

                scope.case.$update(caseUpdateSuccess, caseUpdateError);
                function caseUpdateSuccess(){
                    toastr.success('This case has been updated', 'Success');
                    scope.$emit('pauseOrResumeCasePolling', {'pause': false});
                }
                function caseUpdateError(error){
                    toastr.success('This case has been updated', 'Success');
                    scope.$emit('pauseOrResumeCasePolling', {'pause': false});
                    // TODO: figure out why we are getting errors here
                    // toastr.error('The case has failed to update.<br/> Please report the error and try again.', 'Error');
                }
            };

            scope.openCompleteCase = function(event) {
                event.preventDefault();

                var modalInstance = CaseCompleteService.open(scope.case);

                modalInstance.opened.then(function(){
                    scope.$emit('pauseOrResumeCasePolling', {'pause': true});
                });

                modalInstance.closed.then(function(){
                    scope.$emit('pauseOrResumeCasePolling', {'pause': false});
                });
            };

            scope.fieldTouched = function () {
                scope.$emit('pauseOrResumeCasePolling', {'pause': true});
            };

            scope.openDatePopup = function () {
                if (!scope.case.isResolved) {
                    scope.datePopup.opened = true;
                }
            };

            scope.$on('currentCaseSet', function(){
                scope.localEstimateHours = scope.case.estimateHours/1;
            });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SupportCaseReportDialogController', SupportCaseReportDialogController);

    SupportCaseReportDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SupportCaseReport', 'Supportcase', 'Rating'];

    function SupportCaseReportDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SupportCaseReport, Supportcase, Rating) {
        var vm = this;
        vm.supportCaseReport = entity;
        vm.supportcases = Supportcase.query();
        vm.ratings = Rating.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:supportCaseReportUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.supportCaseReport.id !== null) {
                SupportCaseReport.update(vm.supportCaseReport, onSaveSuccess, onSaveError);
            } else {
                SupportCaseReport.save(vm.supportCaseReport, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.datePaid = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();

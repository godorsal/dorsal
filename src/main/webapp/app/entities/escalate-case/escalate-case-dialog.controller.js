(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('EscalateCaseDialogController', EscalateCaseDialogController);

    EscalateCaseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EscalateCase', 'Supportcase', 'User'];

    function EscalateCaseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EscalateCase, Supportcase, User) {
        var vm = this;
        vm.escalateCase = entity;
        vm.supportcases = Supportcase.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:escalateCaseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.escalateCase.id !== null) {
                EscalateCase.update(vm.escalateCase, onSaveSuccess, onSaveError);
            } else {
                EscalateCase.save(vm.escalateCase, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateEscalated = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();

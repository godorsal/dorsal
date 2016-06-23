(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('StatusDialogController', StatusDialogController);

    StatusDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Status', 'Supportcase'];

    function StatusDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Status, Supportcase) {
        var vm = this;
        vm.status = entity;
        vm.supportcases = Supportcase.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:statusUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.status.id !== null) {
                Status.update(vm.status, onSaveSuccess, onSaveError);
            } else {
                Status.save(vm.status, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

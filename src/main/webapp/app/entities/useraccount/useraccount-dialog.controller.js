(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UseraccountDialogController', UseraccountDialogController);

    UseraccountDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Useraccount'];

    function UseraccountDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Useraccount) {
        var vm = this;
        vm.useraccount = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:useraccountUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.useraccount.id !== null) {
                Useraccount.update(vm.useraccount, onSaveSuccess, onSaveError);
            } else {
                Useraccount.save(vm.useraccount, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

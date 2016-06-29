(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UseraccountDialogController', UseraccountDialogController);

    UseraccountDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Useraccount', 'User'];

    function UseraccountDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Useraccount, User) {
        var vm = this;
        vm.useraccount = entity;
        vm.users = User.query();

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

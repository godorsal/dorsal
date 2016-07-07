(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SharedCaseDialogController', SharedCaseDialogController);

    SharedCaseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SharedCase', 'Supportcase', 'User'];

    function SharedCaseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SharedCase, Supportcase, User) {
        var vm = this;
        vm.sharedCase = entity;
        vm.supportcases = Supportcase.query();
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:sharedCaseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.sharedCase.id !== null) {
                SharedCase.update(vm.sharedCase, onSaveSuccess, onSaveError);
            } else {
                SharedCase.save(vm.sharedCase, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

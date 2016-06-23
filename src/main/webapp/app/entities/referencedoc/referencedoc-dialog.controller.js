(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ReferencedocDialogController', ReferencedocDialogController);

    ReferencedocDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Referencedoc', 'User', 'Technology'];

    function ReferencedocDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Referencedoc, User, Technology) {
        var vm = this;
        vm.referencedoc = entity;
        vm.users = User.query();
        vm.technologies = Technology.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:referencedocUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.referencedoc.id !== null) {
                Referencedoc.update(vm.referencedoc, onSaveSuccess, onSaveError);
            } else {
                Referencedoc.save(vm.referencedoc, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

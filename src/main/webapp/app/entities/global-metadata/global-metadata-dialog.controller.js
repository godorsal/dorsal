(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('GlobalMetadataDialogController', GlobalMetadataDialogController);

    GlobalMetadataDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'GlobalMetadata'];

    function GlobalMetadataDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, GlobalMetadata) {
        var vm = this;
        vm.globalMetadata = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:globalMetadataUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.globalMetadata.id !== null) {
                GlobalMetadata.update(vm.globalMetadata, onSaveSuccess, onSaveError);
            } else {
                GlobalMetadata.save(vm.globalMetadata, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

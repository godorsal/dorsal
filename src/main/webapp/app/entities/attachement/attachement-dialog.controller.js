(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachementDialogController', AttachementDialogController);

    AttachementDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Attachement', 'Supportcase'];

    function AttachementDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Attachement, Supportcase) {
        var vm = this;
        vm.attachement = entity;
        vm.supportcases = Supportcase.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:attachementUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.attachement.id !== null) {
                Attachement.update(vm.attachement, onSaveSuccess, onSaveError);
            } else {
                Attachement.save(vm.attachement, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAttributeDialogController', ExpertAttributeDialogController);

    ExpertAttributeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ExpertAttribute', 'ExpertAttributeToExpert'];

    function ExpertAttributeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ExpertAttribute, ExpertAttributeToExpert) {
        var vm = this;

        vm.expertAttribute = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertattributetoexperts = ExpertAttributeToExpert.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.expertAttribute.id !== null) {
                ExpertAttribute.update(vm.expertAttribute, onSaveSuccess, onSaveError);
            } else {
                ExpertAttribute.save(vm.expertAttribute, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:expertAttributeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

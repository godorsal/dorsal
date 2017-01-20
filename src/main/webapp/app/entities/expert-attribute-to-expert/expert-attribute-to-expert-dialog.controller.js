(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAttributeToExpertDialogController', ExpertAttributeToExpertDialogController);

    ExpertAttributeToExpertDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ExpertAttributeToExpert', 'ExpertAccount', 'ExpertAttribute'];

    function ExpertAttributeToExpertDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ExpertAttributeToExpert, ExpertAccount, ExpertAttribute) {
        var vm = this;

        vm.expertAttributeToExpert = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertaccounts = ExpertAccount.query();
        vm.expertattributes = ExpertAttribute.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.expertAttributeToExpert.id !== null) {
                ExpertAttributeToExpert.update(vm.expertAttributeToExpert, onSaveSuccess, onSaveError);
            } else {
                ExpertAttributeToExpert.save(vm.expertAttributeToExpert, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:expertAttributeToExpertUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

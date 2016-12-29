(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertPoolToExpertDialogController', ExpertPoolToExpertDialogController);

    ExpertPoolToExpertDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ExpertPoolToExpert', 'ExpertAccount', 'ExpertPool'];

    function ExpertPoolToExpertDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ExpertPoolToExpert, ExpertAccount, ExpertPool) {
        var vm = this;

        vm.expertPoolToExpert = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertaccounts = ExpertAccount.query();
        vm.expertpools = ExpertPool.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.expertPoolToExpert.id !== null) {
                ExpertPoolToExpert.update(vm.expertPoolToExpert, onSaveSuccess, onSaveError);
            } else {
                ExpertPoolToExpert.save(vm.expertPoolToExpert, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:expertPoolToExpertUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertPoolDialogController', ExpertPoolDialogController);

    ExpertPoolDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ExpertPool', 'ExpertPoolToExpert', 'ExpertAccount'];

    function ExpertPoolDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ExpertPool, ExpertPoolToExpert, ExpertAccount) {
        var vm = this;

        vm.expertPool = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertpooltoexperts = ExpertPoolToExpert.query();
        vm.expertaccounts = ExpertAccount.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.expertPool.id !== null) {
                ExpertPool.update(vm.expertPool, onSaveSuccess, onSaveError);
            } else {
                ExpertPool.save(vm.expertPool, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:expertPoolUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

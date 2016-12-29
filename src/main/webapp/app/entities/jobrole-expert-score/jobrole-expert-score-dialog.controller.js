(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('JobroleExpertScoreDialogController', JobroleExpertScoreDialogController);

    JobroleExpertScoreDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'JobroleExpertScore', 'ExpertAccount', 'JobRole'];

    function JobroleExpertScoreDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, JobroleExpertScore, ExpertAccount, JobRole) {
        var vm = this;

        vm.jobroleExpertScore = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertaccounts = ExpertAccount.query();
        vm.jobroles = JobRole.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.jobroleExpertScore.id !== null) {
                JobroleExpertScore.update(vm.jobroleExpertScore, onSaveSuccess, onSaveError);
            } else {
                JobroleExpertScore.save(vm.jobroleExpertScore, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:jobroleExpertScoreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

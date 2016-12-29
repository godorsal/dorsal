(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('JobRoleDialogController', JobRoleDialogController);

    JobRoleDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'JobRole', 'JobroleExpertScore'];

    function JobRoleDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, JobRole, JobroleExpertScore) {
        var vm = this;

        vm.jobRole = entity;
        vm.clear = clear;
        vm.save = save;
        vm.jobroleexpertscores = JobroleExpertScore.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.jobRole.id !== null) {
                JobRole.update(vm.jobRole, onSaveSuccess, onSaveError);
            } else {
                JobRole.save(vm.jobRole, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:jobRoleUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

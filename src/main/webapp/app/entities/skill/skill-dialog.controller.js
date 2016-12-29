(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SkillDialogController', SkillDialogController);

    SkillDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Skill', 'SkillExpertScore'];

    function SkillDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Skill, SkillExpertScore) {
        var vm = this;

        vm.skill = entity;
        vm.clear = clear;
        vm.save = save;
        vm.skillexpertscores = SkillExpertScore.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.skill.id !== null) {
                Skill.update(vm.skill, onSaveSuccess, onSaveError);
            } else {
                Skill.save(vm.skill, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:skillUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

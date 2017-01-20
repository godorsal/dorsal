(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SkillExpertScoreDialogController', SkillExpertScoreDialogController);

    SkillExpertScoreDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SkillExpertScore', 'ExpertAccount', 'Skill'];

    function SkillExpertScoreDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SkillExpertScore, ExpertAccount, Skill) {
        var vm = this;

        vm.skillExpertScore = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertaccounts = ExpertAccount.query();
        vm.skills = Skill.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.skillExpertScore.id !== null) {
                SkillExpertScore.update(vm.skillExpertScore, onSaveSuccess, onSaveError);
            } else {
                SkillExpertScore.save(vm.skillExpertScore, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:skillExpertScoreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

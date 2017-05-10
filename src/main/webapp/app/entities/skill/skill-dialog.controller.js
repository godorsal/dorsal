(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SkillDialogController', SkillDialogController);

    SkillDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Skill', 'SkillExpertScore', 'ExpertAccount'];

    function SkillDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Skill, SkillExpertScore, ExpertAccount) {
        var vm = this;

        vm.skill = entity;
        vm.clear = clear;
        vm.save = save;
        vm.skillexpertscores = SkillExpertScore.query();
        vm.expertaccounts = [];
        ExpertAccount.query({param: "experts"},function (res) {
            res.forEach(function (account) {
                vm.expertaccounts.push(account.id);
            })
        })


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
            vm.expertaccounts.forEach(function (expertaccount) {
                SkillExpertScore.save({score: 0, expertaccount: {
                    id: expertaccount
                }, skill: result}, function (res) {
                    console.log("SES SAVE SUCCESS", res);
                }, function (res) {
                    console.log("SES SAVE FAILURE", res);
                })
            })
            $scope.$emit('dorsalApp:skillUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentSkillsController', SelfAssesmentSkillsController);

    SelfAssesmentSkillsController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService', 'SkillExpertScore'];

    function SelfAssesmentSkillsController($state, Technology, Principal, DrslUserFlowService, SkillExpertScore) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;

        vm.skills = [];
        vm.skillsToUpdate = [];
        vm.scores = [1, 2, 3, 4, 5];
        vm.skills = SkillExpertScore.query();

        vm.changeScore = changeScore;
        vm.submit = submit;


        function changeScore(skill) {
            vm.skillsToUpdate.push(skill)
        }

        function submit() {
            vm.skillsToUpdate.forEach(function (skill) {
                SkillExpertScore.update(skill)
            })
            $state.go('settings')
        }
    }
})();

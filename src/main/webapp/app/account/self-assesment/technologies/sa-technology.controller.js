(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentTechnologyController', SelfAssesmentTechnologyController);

    SelfAssesmentTechnologyController.$inject = ['$state', 'TechnologyExpertScore', 'Principal', 'DrslUserFlowService'];

    function SelfAssesmentTechnologyController($state, TechnologyExpertScore, Principal, DrslUserFlowService) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;

        vm.technologies = [];
        vm.technologiesToUpdate = [];
        vm.scores = [1, 2, 3, 4, 5];
        vm.technologies = TechnologyExpertScore.query();
        console.log(vm.technologies);
        vm.changeScore = changeScore;
        vm.submit = submit;


        function changeScore(technology) {
            vm.technologiesToUpdate.push(technology)
        }

        function submit() {
            vm.technologiesToUpdate.forEach(function (technology) {
                TechnologyExpertScore.update(technology)
            })
            $state.go('settings')
        }
    }
})();

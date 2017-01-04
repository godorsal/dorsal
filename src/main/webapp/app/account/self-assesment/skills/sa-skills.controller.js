(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentSkillsController', SelfAssesmentSkillsController);

    SelfAssesmentSkillsController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService'];

    function SelfAssesmentSkillsController($state, Technology, Principal, DrslUserFlowService) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;
        // vm.technologies = Technology.query()
        vm.skills = ["Configuration Review","Benchmarking","Query tuning","Installations","AWS RDBS","Cluster Design","Database HA","OpenStack infrastructure","VMware infrastructure","AWS infrastructure"]
        vm.scores = [1, 2, 3, 4, 5]

        vm.expert = DrslUserFlowService.user.expert;

        vm.submit = submit;

        function submit() {
            vm.expert.technologies = vm.technologies;
            $state.go('settings')
            // $state.go('skills')
        }
    }
})();

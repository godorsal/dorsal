(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentJobRoleController', SelfAssesmentJobRoleController);

    SelfAssesmentJobRoleController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService'];

    function SelfAssesmentJobRoleController($state, Technology, Principal, DrslUserFlowService) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;
        // vm.technologies = Technology.query()
        vm.roles = ["Administrator", "Architect", "Developer", "DevOps", "Data Model Designer"]
        vm.scores = [1, 2, 3, 4, 5]

        vm.expert = DrslUserFlowService.user.expert;

        vm.submit = submit;

        function submit() {
            var tech = "selfAssesmentSkills";
            vm.expert.technologies = vm.technologies;
            $state.go("settings")
            // $state.go('products')
        }
    }
})();

(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentTechnologyController', SelfAssesmentTechnologyController);

    SelfAssesmentTechnologyController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService'];

    function SelfAssesmentTechnologyController($state, Technology, Principal, DrslUserFlowService) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;
        vm.technologies = Technology.query()
        vm.scores = [1, 2, 3, 4, 5]

        vm.expert = DrslUserFlowService.user.expert;

        vm.submit = submit;

        function submit() {
            // vm.expert.technologies = vm.technologies;
            $state.go('settings')
        }
    }
})();

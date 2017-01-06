(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentJobRoleController', SelfAssesmentJobRoleController);

    SelfAssesmentJobRoleController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService', 'JobroleExpertScore'];

    function SelfAssesmentJobRoleController($state, Technology, Principal, DrslUserFlowService, JobroleExpertScore) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;

        vm.roles = [];
        vm.rolesToUpdate = [];
        vm.scores = [1, 2, 3, 4, 5];
        vm.roles = JobroleExpertScore.query();

        vm.changeScore = changeScore;
        vm.submit = submit;


        function changeScore(role) {
            vm.rolesToUpdate.push(role)
        }

        function submit() {
            vm.rolesToUpdate.forEach(function (role) {
                JobroleExpertScore.update(role)
            })
            $state.go('settings')
        }
    }
})();

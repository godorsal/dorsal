(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentSpecialtiesController', SelfAssesmentSpecialtiesController);

    SelfAssesmentSpecialtiesController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService'];

    function SelfAssesmentSpecialtiesController($state, Technology, Principal, DrslUserFlowService) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;
        // vm.technologies = Technology.query()
        vm.specialties = [
            "Oracle to MySQL transitions",
        "Oracle to MongoDB transitions",
        "Oracle to PostgreSQL transitions",
        "Database Infrastructure",
        "MS SQL to FOSS transitions"]
        vm.scores = [1, 2, 3, 4, 5]

        vm.expert = DrslUserFlowService.user.expert;

        vm.submit = submit;

        function submit() {
            vm.expert.technologies = vm.technologies;
            $state.go('settings')
            // $state.go('products')
        }
    }
})();

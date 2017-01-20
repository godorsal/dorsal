(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentSpecialtiesController', SelfAssesmentSpecialtiesController);

    SelfAssesmentSpecialtiesController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService', 'SpecialityExpertScore'];

    function SelfAssesmentSpecialtiesController($state, Technology, Principal, DrslUserFlowService, SpecialityExpertScore) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;

        vm.specialtiesToUpdate = [];
        vm.scores = [1, 2, 3, 4, 5];
        vm.specialties = SpecialityExpertScore.query();
        console.log(vm.specialties);
        vm.changeScore = changeScore;
        vm.submit = submit;


        function changeScore(speciality) {
            vm.specialtiesToUpdate.push(speciality)
        }

        function submit() {
            vm.specialtiesToUpdate.forEach(function (speciality) {
                SpecialityExpertScore.update(speciality)
            })
            $state.go('settings')
        }
    }
})();

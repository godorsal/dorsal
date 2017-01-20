(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SpecialityExpertScoreController', SpecialityExpertScoreController);

    SpecialityExpertScoreController.$inject = ['$scope', '$state', 'SpecialityExpertScore'];

    function SpecialityExpertScoreController ($scope, $state, SpecialityExpertScore) {
        var vm = this;
        
        vm.specialityExpertScores = [];

        loadAll();

        function loadAll() {
            SpecialityExpertScore.query(function(result) {
                vm.specialityExpertScores = result;
            });
        }
    }
})();

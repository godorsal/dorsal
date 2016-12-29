(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyExpertScoreController', TechnologyExpertScoreController);

    TechnologyExpertScoreController.$inject = ['$scope', '$state', 'TechnologyExpertScore'];

    function TechnologyExpertScoreController ($scope, $state, TechnologyExpertScore) {
        var vm = this;
        
        vm.technologyExpertScores = [];

        loadAll();

        function loadAll() {
            TechnologyExpertScore.query(function(result) {
                vm.technologyExpertScores = result;
            });
        }
    }
})();

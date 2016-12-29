(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SkillExpertScoreController', SkillExpertScoreController);

    SkillExpertScoreController.$inject = ['$scope', '$state', 'SkillExpertScore'];

    function SkillExpertScoreController ($scope, $state, SkillExpertScore) {
        var vm = this;
        
        vm.skillExpertScores = [];

        loadAll();

        function loadAll() {
            SkillExpertScore.query(function(result) {
                vm.skillExpertScores = result;
            });
        }
    }
})();

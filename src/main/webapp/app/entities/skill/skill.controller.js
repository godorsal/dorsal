(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SkillController', SkillController);

    SkillController.$inject = ['$scope', '$state', 'Skill'];

    function SkillController ($scope, $state, Skill) {
        var vm = this;
        
        vm.skills = [];

        loadAll();

        function loadAll() {
            Skill.query(function(result) {
                vm.skills = result;
            });
        }
    }
})();

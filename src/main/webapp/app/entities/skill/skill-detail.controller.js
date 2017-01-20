(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SkillDetailController', SkillDetailController);

    SkillDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Skill', 'SkillExpertScore'];

    function SkillDetailController($scope, $rootScope, $stateParams, previousState, entity, Skill, SkillExpertScore) {
        var vm = this;

        vm.skill = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:skillUpdate', function(event, result) {
            vm.skill = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

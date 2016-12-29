(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SkillExpertScoreDetailController', SkillExpertScoreDetailController);

    SkillExpertScoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'SkillExpertScore', 'ExpertAccount', 'Skill'];

    function SkillExpertScoreDetailController($scope, $rootScope, $stateParams, previousState, entity, SkillExpertScore, ExpertAccount, Skill) {
        var vm = this;

        vm.skillExpertScore = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:skillExpertScoreUpdate', function(event, result) {
            vm.skillExpertScore = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

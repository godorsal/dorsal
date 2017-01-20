(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyExpertScoreDetailController', TechnologyExpertScoreDetailController);

    TechnologyExpertScoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TechnologyExpertScore', 'ExpertAccount', 'Technology'];

    function TechnologyExpertScoreDetailController($scope, $rootScope, $stateParams, previousState, entity, TechnologyExpertScore, ExpertAccount, Technology) {
        var vm = this;

        vm.technologyExpertScore = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:technologyExpertScoreUpdate', function(event, result) {
            vm.technologyExpertScore = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertPoolDetailController', ExpertPoolDetailController);

    ExpertPoolDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ExpertPool', 'ExpertPoolToExpert', 'ExpertAccount'];

    function ExpertPoolDetailController($scope, $rootScope, $stateParams, previousState, entity, ExpertPool, ExpertPoolToExpert, ExpertAccount) {
        var vm = this;

        vm.expertPool = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:expertPoolUpdate', function(event, result) {
            vm.expertPool = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

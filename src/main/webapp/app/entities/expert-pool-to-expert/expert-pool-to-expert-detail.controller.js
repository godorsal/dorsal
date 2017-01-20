(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertPoolToExpertDetailController', ExpertPoolToExpertDetailController);

    ExpertPoolToExpertDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ExpertPoolToExpert', 'ExpertAccount', 'ExpertPool'];

    function ExpertPoolToExpertDetailController($scope, $rootScope, $stateParams, previousState, entity, ExpertPoolToExpert, ExpertAccount, ExpertPool) {
        var vm = this;

        vm.expertPoolToExpert = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:expertPoolToExpertUpdate', function(event, result) {
            vm.expertPoolToExpert = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

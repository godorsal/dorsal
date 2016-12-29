(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAttributeDetailController', ExpertAttributeDetailController);

    ExpertAttributeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ExpertAttribute', 'ExpertAttributeToExpert'];

    function ExpertAttributeDetailController($scope, $rootScope, $stateParams, previousState, entity, ExpertAttribute, ExpertAttributeToExpert) {
        var vm = this;

        vm.expertAttribute = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:expertAttributeUpdate', function(event, result) {
            vm.expertAttribute = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

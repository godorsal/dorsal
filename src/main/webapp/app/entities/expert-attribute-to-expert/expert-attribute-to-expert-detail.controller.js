(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAttributeToExpertDetailController', ExpertAttributeToExpertDetailController);

    ExpertAttributeToExpertDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ExpertAttributeToExpert', 'ExpertAccount', 'ExpertAttribute'];

    function ExpertAttributeToExpertDetailController($scope, $rootScope, $stateParams, previousState, entity, ExpertAttributeToExpert, ExpertAccount, ExpertAttribute) {
        var vm = this;

        vm.expertAttributeToExpert = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:expertAttributeToExpertUpdate', function(event, result) {
            vm.expertAttributeToExpert = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

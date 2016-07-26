(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('EscalateCaseDetailController', EscalateCaseDetailController);

    EscalateCaseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'EscalateCase', 'Supportcase', 'User'];

    function EscalateCaseDetailController($scope, $rootScope, $stateParams, entity, EscalateCase, Supportcase, User) {
        var vm = this;
        vm.escalateCase = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:escalateCaseUpdate', function(event, result) {
            vm.escalateCase = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

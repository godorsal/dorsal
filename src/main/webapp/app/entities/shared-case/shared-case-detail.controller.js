(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SharedCaseDetailController', SharedCaseDetailController);

    SharedCaseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'SharedCase', 'Supportcase', 'User'];

    function SharedCaseDetailController($scope, $rootScope, $stateParams, entity, SharedCase, Supportcase, User) {
        var vm = this;
        vm.sharedCase = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:sharedCaseUpdate', function(event, result) {
            vm.sharedCase = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

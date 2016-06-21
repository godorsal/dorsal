(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('StatusDetailController', StatusDetailController);

    StatusDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Status'];

    function StatusDetailController($scope, $rootScope, $stateParams, entity, Status) {
        var vm = this;
        vm.status = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:statusUpdate', function(event, result) {
            vm.status = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

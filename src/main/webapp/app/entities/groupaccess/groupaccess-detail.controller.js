(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('GroupaccessDetailController', GroupaccessDetailController);

    GroupaccessDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Groupaccess', 'User'];

    function GroupaccessDetailController($scope, $rootScope, $stateParams, entity, Groupaccess, User) {
        var vm = this;
        vm.groupaccess = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:groupaccessUpdate', function(event, result) {
            vm.groupaccess = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

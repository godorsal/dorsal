(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UseraccountDetailController', UseraccountDetailController);

    UseraccountDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Useraccount', 'User'];

    function UseraccountDetailController($scope, $rootScope, $stateParams, entity, Useraccount, User) {
        var vm = this;
        vm.useraccount = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:useraccountUpdate', function(event, result) {
            vm.useraccount = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

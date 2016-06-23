(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertbadgeDetailController', ExpertbadgeDetailController);

    ExpertbadgeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Expertbadge', 'User', 'Badge'];

    function ExpertbadgeDetailController($scope, $rootScope, $stateParams, entity, Expertbadge, User, Badge) {
        var vm = this;
        vm.expertbadge = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:expertbadgeUpdate', function(event, result) {
            vm.expertbadge = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

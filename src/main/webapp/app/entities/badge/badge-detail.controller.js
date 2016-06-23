(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('BadgeDetailController', BadgeDetailController);

    BadgeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Badge', 'Expertbadge'];

    function BadgeDetailController($scope, $rootScope, $stateParams, entity, Badge, Expertbadge) {
        var vm = this;
        vm.badge = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:badgeUpdate', function(event, result) {
            vm.badge = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

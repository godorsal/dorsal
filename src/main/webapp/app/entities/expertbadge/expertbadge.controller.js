(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertbadgeController', ExpertbadgeController);

    ExpertbadgeController.$inject = ['$scope', '$state', 'Expertbadge'];

    function ExpertbadgeController ($scope, $state, Expertbadge) {
        var vm = this;
        vm.expertbadges = [];
        vm.loadAll = function() {
            Expertbadge.query(function(result) {
                vm.expertbadges = result;
            });
        };

        vm.loadAll();
        
    }
})();

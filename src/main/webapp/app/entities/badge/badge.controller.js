(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('BadgeController', BadgeController);

    BadgeController.$inject = ['$scope', '$state', 'Badge'];

    function BadgeController ($scope, $state, Badge) {
        var vm = this;
        vm.badges = [];
        vm.loadAll = function() {
            Badge.query(function(result) {
                vm.badges = result;
            });
        };

        vm.loadAll();
        
    }
})();

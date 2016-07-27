(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('GroupaccessController', GroupaccessController);

    GroupaccessController.$inject = ['$scope', '$state', 'Groupaccess'];

    function GroupaccessController ($scope, $state, Groupaccess) {
        var vm = this;
        vm.groupaccesses = [];
        vm.loadAll = function() {
            Groupaccess.query(function(result) {
                vm.groupaccesses = result;
            });
        };

        vm.loadAll();

    }
})();

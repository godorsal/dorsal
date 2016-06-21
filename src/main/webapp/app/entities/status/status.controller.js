(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('StatusController', StatusController);

    StatusController.$inject = ['$scope', '$state', 'Status'];

    function StatusController ($scope, $state, Status) {
        var vm = this;
        vm.statuses = [];
        vm.loadAll = function() {
            Status.query(function(result) {
                vm.statuses = result;
            });
        };

        vm.loadAll();
        
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAccountController', ExpertAccountController);

    ExpertAccountController.$inject = ['$scope', '$state', 'ExpertAccount'];

    function ExpertAccountController ($scope, $state, ExpertAccount) {
        var vm = this;
        vm.expertAccounts = [];
        vm.loadAll = function() {
            ExpertAccount.query(function(result) {
                vm.expertAccounts = result;
            });
        };

        vm.loadAll();
        
    }
})();

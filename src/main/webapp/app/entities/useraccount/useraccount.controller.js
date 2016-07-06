(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UseraccountController', UseraccountController);

    UseraccountController.$inject = ['$scope', '$state', 'Useraccount'];

    function UseraccountController ($scope, $state, Useraccount) {
        var vm = this;
        vm.useraccounts = [];
        vm.loadAll = function() {
            Useraccount.query(function(result) {
                vm.useraccounts = result;
            });
        };

        vm.loadAll();
        
    }
})();

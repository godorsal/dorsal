(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['$scope', '$state', 'Payment'];

    function PaymentController ($scope, $state, Payment) {
        var vm = this;
        vm.payments = [];
        vm.loadAll = function() {
            Payment.query(function(result) {
                vm.payments = result;
            });
        };

        vm.loadAll();
        
    }
})();

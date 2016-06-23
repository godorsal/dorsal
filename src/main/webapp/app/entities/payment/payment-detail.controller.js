(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('PaymentDetailController', PaymentDetailController);

    PaymentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Payment', 'User'];

    function PaymentDetailController($scope, $rootScope, $stateParams, entity, Payment, User) {
        var vm = this;
        vm.payment = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:paymentUpdate', function(event, result) {
            vm.payment = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

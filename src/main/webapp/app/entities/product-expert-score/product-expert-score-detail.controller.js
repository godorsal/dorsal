(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ProductExpertScoreDetailController', ProductExpertScoreDetailController);

    ProductExpertScoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ProductExpertScore', 'ExpertAccount', 'Product'];

    function ProductExpertScoreDetailController($scope, $rootScope, $stateParams, previousState, entity, ProductExpertScore, ExpertAccount, Product) {
        var vm = this;

        vm.productExpertScore = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:productExpertScoreUpdate', function(event, result) {
            vm.productExpertScore = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

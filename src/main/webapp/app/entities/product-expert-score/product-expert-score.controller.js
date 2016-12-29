(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ProductExpertScoreController', ProductExpertScoreController);

    ProductExpertScoreController.$inject = ['$scope', '$state', 'ProductExpertScore'];

    function ProductExpertScoreController ($scope, $state, ProductExpertScore) {
        var vm = this;
        
        vm.productExpertScores = [];

        loadAll();

        function loadAll() {
            ProductExpertScore.query(function(result) {
                vm.productExpertScores = result;
            });
        }
    }
})();

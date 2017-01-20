(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentProductController', SelfAssesmentProductController);

    SelfAssesmentProductController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService', 'Product', 'ProductExpertScore'];

    function SelfAssesmentProductController($state, Technology, Principal, DrslUserFlowService, Product, ProductExpertScore) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;

        vm.products = [];
        vm.productsToUpdate = [];
        vm.scores = [1, 2, 3, 4, 5];
        vm.products = ProductExpertScore.query();
        
        vm.changeScore = changeScore;
        vm.submit = submit;


        function changeScore(product) {
            vm.productsToUpdate.push(product)
        }

        function submit() {
            vm.productsToUpdate.forEach(function (product) {
                ProductExpertScore.update(product)
            })
            $state.go('settings')
        }
    }
})();

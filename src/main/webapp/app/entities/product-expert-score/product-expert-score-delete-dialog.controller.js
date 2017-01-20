(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ProductExpertScoreDeleteController',ProductExpertScoreDeleteController);

    ProductExpertScoreDeleteController.$inject = ['$uibModalInstance', 'entity', 'ProductExpertScore'];

    function ProductExpertScoreDeleteController($uibModalInstance, entity, ProductExpertScore) {
        var vm = this;

        vm.productExpertScore = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ProductExpertScore.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

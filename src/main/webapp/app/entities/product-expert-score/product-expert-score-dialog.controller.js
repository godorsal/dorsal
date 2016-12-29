(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ProductExpertScoreDialogController', ProductExpertScoreDialogController);

    ProductExpertScoreDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ProductExpertScore', 'ExpertAccount', 'Product'];

    function ProductExpertScoreDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ProductExpertScore, ExpertAccount, Product) {
        var vm = this;

        vm.productExpertScore = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertaccounts = ExpertAccount.query();
        vm.products = Product.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.productExpertScore.id !== null) {
                ProductExpertScore.update(vm.productExpertScore, onSaveSuccess, onSaveError);
            } else {
                ProductExpertScore.save(vm.productExpertScore, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:productExpertScoreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ProductDialogController', ProductDialogController);

    ProductDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Product', 'ProductExpertScore', 'ExpertAccount'];

    function ProductDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Product, ProductExpertScore, ExpertAccount) {
        var vm = this;

        vm.product = entity;
        vm.clear = clear;
        vm.save = save;
        vm.productexpertscores = ProductExpertScore.query();
        vm.expertaccounts = [];

        ExpertAccount.query({param: "experts"},function (res) {
            res.forEach(function (account) {
                vm.expertaccounts.push(account.id);
            })
        })

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.product.id !== null) {
                Product.update(vm.product, onSaveSuccess, onSaveError);
            } else {
                Product.save(vm.product, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            console.log("PRODUCT SAVE RESULT", result.id);
            console.log("EXPERTS?", vm.expertaccounts);
            vm.expertaccounts.forEach(function (expertaccount) {
                ProductExpertScore.save({score: 0, expertaccount: {
                    id: expertaccount
                }, product: result}, function (res) {
                    console.log("PES SAVE SUCCESS", res);
                }, function (res) {
                    console.log("PES SAVE FAILURE", res);
                })
            })
            $scope.$emit('dorsalApp:productUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ExpertGroupsManagementModalController', ExpertGroupsManagementModalController);

    ExpertGroupsManagementModalController.$inject = ['$scope', '$timeout', '$uibModalInstance', '$document', '$translate', 'ExpertAccount', 'ExpertPool', 'ExpertPoolToExpert', '$rootScope', 'ExpertAttribute', 'Product'];

    function ExpertGroupsManagementModalController($scope, $timeout, $uibModalInstance, $document, $translate, ExpertAccount, ExpertPool, ExpertPoolToExpert, $rootScope, ExpertAttribute, Product) {
        var vm = this;
        vm.expertsToAdd = [];
        vm.expertsToDelete = [];
        vm.currentExperts = [];
        vm.pending = false;
        vm.viewOnly = false;
        vm.changesMade = false;
        vm.queryString = "";
        vm.newGroup = {
            expertSelection: 'EXPERT_IN_POOL_FIRST'
        };
        vm.queryProducts = [];
        vm.queryAttributes = [];
        vm.queryObject = {};
        // ExpertAccount.query(function (res) {
        ExpertAccount.query({param: "experts"},function (res) {
            vm.availableExperts = res;
            checkResolve();
            if($scope.$resolve.viewOnly){
                vm.viewOnly = true;
            }
        })
        vm.searchExperts = function () {
            ExpertAccount.query({param: "query", options: vm.queryString}, function (res) {
                // console.log("REEEZ", res);
                vm.availableExperts = res;
                checkResolve();
                if($scope.$resolve.viewOnly){
                    vm.viewOnly = true;
                }
            })
        }
        vm.clearQuery = function () {
            vm.queryString = "";
            vm.queryProducts = [];
            vm.queryAttributes = [];
            vm.selectScore = "";
            vm.addAttribute = "";
            vm.addProduct = "";
            vm.queryObject = {};
        }
        ExpertAttribute.query(function (res) {
            vm.availableAttributes = res;
        })
        Product.query(function (res) {
            vm.availableProducts = res;
        })
        function checkResolve() {
            if($scope.$resolve.group){
                vm.editingGroup = true;
                vm.newGroup = $scope.$resolve.group;
                vm.currentExperts = vm.newGroup.experts;
                vm.availableExperts.forEach(function (aExpert, index) {
                    vm.currentExperts.forEach(function (connection) {
                        if(aExpert.id === connection.expertaccount.id){
                            vm.availableExperts.splice(index, 1);
                        }
                    })
                })
            }
        }
        vm.addExpert = function (expert, index) {
            vm.expertsToAdd.push(expert);
            vm.availableExperts.splice(index, 1);
            vm.changesMade = true;

        }
        vm.removeExpert = function (expert, index) {
            vm.changesMade = true;
            vm.availableExperts.push(expert);
            vm.expertsToAdd.splice(index, 1);
        }
        vm.removeCurrentExpert = function (expert, index) {
            vm.expertsToDelete.push(expert);
            vm.availableExperts.push(expert.expertaccount);
            vm.currentExperts.splice(index, 1);
            vm.changesMade = true;
        }
        vm.saveGroup = function () {
            if(!vm.newGroup.description){
                vm.newGroup.description = "Group created on " + new Date();
            }
            if(!vm.newGroup.expertSelection){
                vm.newGroup.expertSelection = 'EXPERT_IN_POOL_FIRST';
            }
            if(vm.newGroup.id){
                ExpertPool.update(vm.newGroup, onGroupSaveSuccess, onSaveError)
            } else {
                ExpertPool.save(vm.newGroup, onGroupSaveSuccess, onSaveError)
            }
        }
        vm.updateQuerystring = function () {
            var showProducts = vm.queryProducts.join(',');
            var showAttributes = vm.queryAttributes.join(',');
            vm.queryString = "product:" + showProducts + ":attribute:" + showAttributes + ":score:" + vm.selectScore;
            vm.queryObject = {
                attributes: vm.queryAttributes,
                products: vm.queryProducts,
                score: vm.selectScore
            }
        }
        vm.enterAttribute = function () {
            if(vm.queryAttributes.length > 0){
                var attIndex = vm.queryAttributes.indexOf(vm.addAttribute);
                if(attIndex != -1){
                    vm.queryAttributes.splice(attIndex, 1);
                } else {
                    vm.queryAttributes.push(vm.addAttribute);
                }
            } else {
                vm.queryAttributes.push(vm.addAttribute);
            }
            vm.updateQuerystring();
        }
        vm.enterProduct = function () {
            if(vm.queryProducts.length > 0){
                var prodIndex = vm.queryProducts.indexOf(vm.addProduct);
                if(prodIndex != -1){
                    vm.queryProducts.splice(prodIndex, 1);
                } else {
                    vm.queryProducts.push(vm.addProduct);
                }
            } else {
                vm.queryProducts.push(vm.addProduct);
            }
            vm.updateQuerystring();
        }
        function onGroupSaveSuccess(res) {
            vm.expertsToAdd.forEach(function (expert) {
                var connection = {
                    expertaccount: expert,
                    expertpool: res
                }
                ExpertPoolToExpert.save(connection, onSaveSuccess, onSaveError)
            })
            if(vm.editingGroup && vm.expertsToDelete.length){
                vm.expertsToDelete.forEach(function (connection) {
                    ExpertPoolToExpert.delete({id: connection.id}, onSaveSuccess, onSaveError)
                })
            }
            $rootScope.$emit('editedGroup');
            $uibModalInstance.dismiss('cancel');
        }
        function onSaveSuccess(res) {
            $rootScope.$emit('editedGroup');
            $uibModalInstance.dismiss('cancel');
        }
        function onSaveError(res) {
            console.error("BAD", res);
        }

        $document.keyup(function(e) {
            if (e.keyCode == 27) {
                attemptToCloseModal()
            }
        });

        vm.closeModal = function () {
            attemptToCloseModal()
        }


        function attemptToCloseModal() {
            if(vm.expertsToAdd.length > 0 && vm.pending === false){
                vm.pending = true;
            } else {
                $uibModalInstance.dismiss('cancel');
            }
        }
    }
})();

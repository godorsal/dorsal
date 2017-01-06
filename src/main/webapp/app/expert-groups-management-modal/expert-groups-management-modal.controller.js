(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ExpertGroupsManagementModalController', ExpertGroupsManagementModalController);

    ExpertGroupsManagementModalController.$inject = ['$scope', '$timeout', '$uibModalInstance', '$document', '$translate', 'ExpertAccount', 'ExpertPool', 'ExpertPoolToExpert', '$rootScope'];

    function ExpertGroupsManagementModalController($scope, $timeout, $uibModalInstance, $document, $translate, ExpertAccount, ExpertPool, ExpertPoolToExpert, $rootScope) {
        var vm = this;
        vm.expertsToAdd = [];
        vm.expertsToDelete = [];
        vm.currentExperts = [];
        vm.pending = false;
        vm.viewOnly = false;
        vm.changesMade = false;


        ExpertAccount.query({id: "experts"},function (res) {
            vm.availableExperts = res;
            checkResolve();
            if($scope.$resolve.viewOnly){
                vm.viewOnly = true;
            }
        })
        function checkResolve() {
            if($scope.$resolve.group){
                vm.editingGroup = true;
                vm.newGroup = $scope.$resolve.group;
                vm.currentExperts = vm.newGroup.experts;
                console.log("CURENT EXPERTS!", vm.currentExperts);
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
            console.log(vm.expertsToAdd);
            vm.changesMade = true;

        }
        vm.removeExpert = function (expert, index) {
            // if(vm.editingGroup){
            //     vm.expertsToAdd.splice(index, 1);
            //     vm.availableExperts.push(expert);
            //     vm.expertsToDelete.push(expert);
            // }
            vm.changesMade = true;
            vm.availableExperts.push(expert);
            vm.expertsToAdd.splice(index, 1);
        }
        vm.removeCurrentExpert = function (expert, index) {
            // if(vm.editingGroup){
            //     vm.expertsToAdd.splice(index, 1);
            //     vm.availableExperts.push(expert);
            // }
            console.log("EXPERT TO DELETE!", expert);
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

        function onGroupSaveSuccess(res) {
            vm.expertsToAdd.forEach(function (expert) {
                var connection = {
                    expertaccount: expert,
                    expertpool: res
                }
                console.log(connection);
                ExpertPoolToExpert.save(connection, onSaveSuccess, onSaveError)
            })
            if(vm.editingGroup && vm.expertsToDelete.length){
                vm.expertsToDelete.forEach(function (connection) {
                    console.log("CONNECTION TO DELETE!", connection);
                    ExpertPoolToExpert.delete({id: connection.id}, onSaveSuccess, onSaveError)
                })
            }
            $rootScope.$emit('editedGroup');
            $uibModalInstance.dismiss('cancel');
        }
        function onSaveSuccess(res) {
            console.log("Good", res);
            $rootScope.$emit('editedGroup');
            $uibModalInstance.dismiss('cancel');
        }
        function onSaveError(res) {
            console.log("BAD", res);
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
                console.log("PENDING!", vm.pending);
            } else {
                $uibModalInstance.dismiss('cancel');
            }
        }
    }
})();

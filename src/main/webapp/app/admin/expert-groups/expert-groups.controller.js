(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ExpertGroupsController', ExpertGroupsController);

    ExpertGroupsController.$inject = ['ExpertPool', 'ExpertPoolToExpert', 'ExpertGroupsManagementModal', 'ExpertAttribute', 'User', '$scope', '$rootScope'];

    function ExpertGroupsController(ExpertPool, ExpertPoolToExpert, ExpertGroupsManagementModal, ExpertAttribute, User, $scope, $rootScope) {
        var vm = this;

        vm.init = init;
        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        vm.expertGroups = [];
        vm.openModal = openModal;
        vm.deleteGroup = deleteGroup;


        function init() {
            ExpertPool.query(function (res) {
                vm.expertGroups = res;
                vm.expertGroups.forEach(function (group) {
                    group.experts = [];
                    ExpertPoolToExpert.query({type: "expertpool", id: group.id}, function (res){
                        res.forEach(function (connection) {
                            group.experts.push(connection)
                        })
                    })
                })
            })
        }
        init();
        
        $rootScope.$on('editedGroup', function () {
            vm.init();
        })
        function deleteGroup(group) {
            group.experts.forEach(function (connection) {
                ExpertPoolToExpert.delete({id: connection.id})
            })
            ExpertPool.delete({id: group.id}, init)
        }
        function openModal(group, viewOnly) {
            if(!viewOnly){
                ExpertGroupsManagementModal.open(group, false)
            } else {
                if(group.experts.length > 0){
                    ExpertGroupsManagementModal.open(group, viewOnly)
                }
            }
        }
    }
})();

(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ExpertGroupsController', ExpertGroupsController);

    ExpertGroupsController.$inject = ['ExpertPool', 'ExpertPoolToExpert', 'ExpertGroupsManagementModal', 'ExpertAttribute', 'User', '$scope', '$rootScope'];

    function ExpertGroupsController(ExpertPool, ExpertPoolToExpert, ExpertGroupsManagementModal, ExpertAttribute, User, $scope, $rootScope) {
        var vm = this;
        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        vm.expertGroups = [];
        vm.openModal = openModal;

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

        User.query(function (user) {
            console.log("user", user);
        })
        $rootScope.$on('editedGroup', function () {
            console.log("ON IT BRO!");
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
        })
        function openModal(group) {
            ExpertGroupsManagementModal.open(group)
        }
    }
})();

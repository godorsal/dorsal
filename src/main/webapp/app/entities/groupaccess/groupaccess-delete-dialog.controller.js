(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('GroupaccessDeleteController',GroupaccessDeleteController);

    GroupaccessDeleteController.$inject = ['$uibModalInstance', 'entity', 'Groupaccess'];

    function GroupaccessDeleteController($uibModalInstance, entity, Groupaccess) {
        var vm = this;
        vm.groupaccess = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Groupaccess.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

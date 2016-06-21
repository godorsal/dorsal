(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('StatusDeleteController',StatusDeleteController);

    StatusDeleteController.$inject = ['$uibModalInstance', 'entity', 'Status'];

    function StatusDeleteController($uibModalInstance, entity, Status) {
        var vm = this;
        vm.status = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Status.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

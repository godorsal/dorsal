(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('JobRoleDeleteController',JobRoleDeleteController);

    JobRoleDeleteController.$inject = ['$uibModalInstance', 'entity', 'JobRole'];

    function JobRoleDeleteController($uibModalInstance, entity, JobRole) {
        var vm = this;

        vm.jobRole = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            JobRole.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

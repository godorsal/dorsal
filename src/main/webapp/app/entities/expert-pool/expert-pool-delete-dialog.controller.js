(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertPoolDeleteController',ExpertPoolDeleteController);

    ExpertPoolDeleteController.$inject = ['$uibModalInstance', 'entity', 'ExpertPool'];

    function ExpertPoolDeleteController($uibModalInstance, entity, ExpertPool) {
        var vm = this;

        vm.expertPool = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ExpertPool.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

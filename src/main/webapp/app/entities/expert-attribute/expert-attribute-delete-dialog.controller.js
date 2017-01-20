(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAttributeDeleteController',ExpertAttributeDeleteController);

    ExpertAttributeDeleteController.$inject = ['$uibModalInstance', 'entity', 'ExpertAttribute'];

    function ExpertAttributeDeleteController($uibModalInstance, entity, ExpertAttribute) {
        var vm = this;

        vm.expertAttribute = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ExpertAttribute.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

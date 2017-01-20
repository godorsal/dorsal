(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAttributeToExpertDeleteController',ExpertAttributeToExpertDeleteController);

    ExpertAttributeToExpertDeleteController.$inject = ['$uibModalInstance', 'entity', 'ExpertAttributeToExpert'];

    function ExpertAttributeToExpertDeleteController($uibModalInstance, entity, ExpertAttributeToExpert) {
        var vm = this;

        vm.expertAttributeToExpert = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ExpertAttributeToExpert.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

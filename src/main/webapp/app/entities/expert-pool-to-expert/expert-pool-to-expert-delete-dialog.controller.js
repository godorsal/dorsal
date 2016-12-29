(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertPoolToExpertDeleteController',ExpertPoolToExpertDeleteController);

    ExpertPoolToExpertDeleteController.$inject = ['$uibModalInstance', 'entity', 'ExpertPoolToExpert'];

    function ExpertPoolToExpertDeleteController($uibModalInstance, entity, ExpertPoolToExpert) {
        var vm = this;

        vm.expertPoolToExpert = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ExpertPoolToExpert.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

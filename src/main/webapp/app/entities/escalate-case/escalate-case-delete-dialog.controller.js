(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('EscalateCaseDeleteController',EscalateCaseDeleteController);

    EscalateCaseDeleteController.$inject = ['$uibModalInstance', 'entity', 'EscalateCase'];

    function EscalateCaseDeleteController($uibModalInstance, entity, EscalateCase) {
        var vm = this;
        vm.escalateCase = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            EscalateCase.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SharedCaseDeleteController',SharedCaseDeleteController);

    SharedCaseDeleteController.$inject = ['$uibModalInstance', 'entity', 'SharedCase'];

    function SharedCaseDeleteController($uibModalInstance, entity, SharedCase) {
        var vm = this;
        vm.sharedCase = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            SharedCase.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

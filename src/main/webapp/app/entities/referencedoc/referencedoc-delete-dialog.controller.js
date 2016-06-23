(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ReferencedocDeleteController',ReferencedocDeleteController);

    ReferencedocDeleteController.$inject = ['$uibModalInstance', 'entity', 'Referencedoc'];

    function ReferencedocDeleteController($uibModalInstance, entity, Referencedoc) {
        var vm = this;
        vm.referencedoc = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Referencedoc.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

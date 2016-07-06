(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('GlobalMetadataDeleteController',GlobalMetadataDeleteController);

    GlobalMetadataDeleteController.$inject = ['$uibModalInstance', 'entity', 'GlobalMetadata'];

    function GlobalMetadataDeleteController($uibModalInstance, entity, GlobalMetadata) {
        var vm = this;
        vm.globalMetadata = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            GlobalMetadata.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

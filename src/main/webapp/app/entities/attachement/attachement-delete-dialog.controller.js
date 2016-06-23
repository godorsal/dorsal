(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachementDeleteController',AttachementDeleteController);

    AttachementDeleteController.$inject = ['$uibModalInstance', 'entity', 'Attachement'];

    function AttachementDeleteController($uibModalInstance, entity, Attachement) {
        var vm = this;
        vm.attachement = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Attachement.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

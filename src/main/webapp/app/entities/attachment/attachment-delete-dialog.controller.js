(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachmentDeleteController',AttachmentDeleteController);

    AttachmentDeleteController.$inject = ['$uibModalInstance', 'entity', 'Attachment'];

    function AttachmentDeleteController($uibModalInstance, entity, Attachment) {
        var vm = this;
        vm.attachment = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Attachment.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

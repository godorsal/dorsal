(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseupdateDeleteController',CaseupdateDeleteController);

    CaseupdateDeleteController.$inject = ['$uibModalInstance', 'entity', 'Caseupdate'];

    function CaseupdateDeleteController($uibModalInstance, entity, Caseupdate) {
        var vm = this;
        vm.caseupdate = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Caseupdate.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

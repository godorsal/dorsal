(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SupportcaseDeleteController',SupportcaseDeleteController);

    SupportcaseDeleteController.$inject = ['$uibModalInstance', 'entity', 'Supportcase'];

    function SupportcaseDeleteController($uibModalInstance, entity, Supportcase) {
        var vm = this;
        vm.supportcase = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Supportcase.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

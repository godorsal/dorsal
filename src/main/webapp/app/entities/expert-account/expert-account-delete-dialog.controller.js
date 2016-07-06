(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAccountDeleteController',ExpertAccountDeleteController);

    ExpertAccountDeleteController.$inject = ['$uibModalInstance', 'entity', 'ExpertAccount'];

    function ExpertAccountDeleteController($uibModalInstance, entity, ExpertAccount) {
        var vm = this;
        vm.expertAccount = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            ExpertAccount.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

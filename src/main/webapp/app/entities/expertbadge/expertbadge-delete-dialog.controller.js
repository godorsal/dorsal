(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertbadgeDeleteController',ExpertbadgeDeleteController);

    ExpertbadgeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Expertbadge'];

    function ExpertbadgeDeleteController($uibModalInstance, entity, Expertbadge) {
        var vm = this;
        vm.expertbadge = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Expertbadge.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyDeleteController',TechnologyDeleteController);

    TechnologyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Technology'];

    function TechnologyDeleteController($uibModalInstance, entity, Technology) {
        var vm = this;
        vm.technology = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Technology.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

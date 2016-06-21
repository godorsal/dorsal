(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologypropertyDeleteController',TechnologypropertyDeleteController);

    TechnologypropertyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Technologyproperty'];

    function TechnologypropertyDeleteController($uibModalInstance, entity, Technologyproperty) {
        var vm = this;
        vm.technologyproperty = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Technologyproperty.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

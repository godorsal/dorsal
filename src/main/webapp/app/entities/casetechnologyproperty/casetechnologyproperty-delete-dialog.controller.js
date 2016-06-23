(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CasetechnologypropertyDeleteController',CasetechnologypropertyDeleteController);

    CasetechnologypropertyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Casetechnologyproperty'];

    function CasetechnologypropertyDeleteController($uibModalInstance, entity, Casetechnologyproperty) {
        var vm = this;
        vm.casetechnologyproperty = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Casetechnologyproperty.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

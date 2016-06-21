(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologypropertyvalueDeleteController',TechnologypropertyvalueDeleteController);

    TechnologypropertyvalueDeleteController.$inject = ['$uibModalInstance', 'entity', 'Technologypropertyvalue'];

    function TechnologypropertyvalueDeleteController($uibModalInstance, entity, Technologypropertyvalue) {
        var vm = this;
        vm.technologypropertyvalue = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Technologypropertyvalue.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

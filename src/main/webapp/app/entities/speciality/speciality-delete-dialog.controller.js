(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SpecialityDeleteController',SpecialityDeleteController);

    SpecialityDeleteController.$inject = ['$uibModalInstance', 'entity', 'Speciality'];

    function SpecialityDeleteController($uibModalInstance, entity, Speciality) {
        var vm = this;

        vm.speciality = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Speciality.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

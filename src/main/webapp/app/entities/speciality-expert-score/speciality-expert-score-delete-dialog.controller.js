(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SpecialityExpertScoreDeleteController',SpecialityExpertScoreDeleteController);

    SpecialityExpertScoreDeleteController.$inject = ['$uibModalInstance', 'entity', 'SpecialityExpertScore'];

    function SpecialityExpertScoreDeleteController($uibModalInstance, entity, SpecialityExpertScore) {
        var vm = this;

        vm.specialityExpertScore = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            SpecialityExpertScore.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

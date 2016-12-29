(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyExpertScoreDeleteController',TechnologyExpertScoreDeleteController);

    TechnologyExpertScoreDeleteController.$inject = ['$uibModalInstance', 'entity', 'TechnologyExpertScore'];

    function TechnologyExpertScoreDeleteController($uibModalInstance, entity, TechnologyExpertScore) {
        var vm = this;

        vm.technologyExpertScore = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TechnologyExpertScore.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

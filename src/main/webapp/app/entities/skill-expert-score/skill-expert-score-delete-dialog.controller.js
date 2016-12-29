(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SkillExpertScoreDeleteController',SkillExpertScoreDeleteController);

    SkillExpertScoreDeleteController.$inject = ['$uibModalInstance', 'entity', 'SkillExpertScore'];

    function SkillExpertScoreDeleteController($uibModalInstance, entity, SkillExpertScore) {
        var vm = this;

        vm.skillExpertScore = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            SkillExpertScore.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

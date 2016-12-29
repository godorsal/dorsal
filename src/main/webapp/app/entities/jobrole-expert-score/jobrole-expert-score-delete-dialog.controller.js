(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('JobroleExpertScoreDeleteController',JobroleExpertScoreDeleteController);

    JobroleExpertScoreDeleteController.$inject = ['$uibModalInstance', 'entity', 'JobroleExpertScore'];

    function JobroleExpertScoreDeleteController($uibModalInstance, entity, JobroleExpertScore) {
        var vm = this;

        vm.jobroleExpertScore = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            JobroleExpertScore.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

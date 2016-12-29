(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyExpertScoreDialogController', TechnologyExpertScoreDialogController);

    TechnologyExpertScoreDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TechnologyExpertScore', 'ExpertAccount', 'Technology'];

    function TechnologyExpertScoreDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TechnologyExpertScore, ExpertAccount, Technology) {
        var vm = this;

        vm.technologyExpertScore = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertaccounts = ExpertAccount.query();
        vm.technologies = Technology.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.technologyExpertScore.id !== null) {
                TechnologyExpertScore.update(vm.technologyExpertScore, onSaveSuccess, onSaveError);
            } else {
                TechnologyExpertScore.save(vm.technologyExpertScore, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:technologyExpertScoreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

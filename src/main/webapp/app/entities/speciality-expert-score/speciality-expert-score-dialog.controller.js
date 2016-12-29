(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SpecialityExpertScoreDialogController', SpecialityExpertScoreDialogController);

    SpecialityExpertScoreDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SpecialityExpertScore', 'ExpertAccount', 'Speciality'];

    function SpecialityExpertScoreDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, SpecialityExpertScore, ExpertAccount, Speciality) {
        var vm = this;

        vm.specialityExpertScore = entity;
        vm.clear = clear;
        vm.save = save;
        vm.expertaccounts = ExpertAccount.query();
        vm.specialities = Speciality.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.specialityExpertScore.id !== null) {
                SpecialityExpertScore.update(vm.specialityExpertScore, onSaveSuccess, onSaveError);
            } else {
                SpecialityExpertScore.save(vm.specialityExpertScore, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:specialityExpertScoreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

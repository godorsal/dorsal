(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SpecialityDialogController', SpecialityDialogController);

    SpecialityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Speciality', 'SpecialityExpertScore'];

    function SpecialityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Speciality, SpecialityExpertScore) {
        var vm = this;

        vm.speciality = entity;
        vm.clear = clear;
        vm.save = save;
        vm.specialityexpertscores = SpecialityExpertScore.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.speciality.id !== null) {
                Speciality.update(vm.speciality, onSaveSuccess, onSaveError);
            } else {
                Speciality.save(vm.speciality, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dorsalApp:specialityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyDialogController', TechnologyDialogController);

    TechnologyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Technology', 'Technologypropertyvalue', 'Referencedoc', 'Supportcase', 'Casetechnologyproperty'];

    function TechnologyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Technology, Technologypropertyvalue, Referencedoc, Supportcase, Casetechnologyproperty) {
        var vm = this;
        vm.technology = entity;
        vm.technologypropertyvalues = Technologypropertyvalue.query();
        vm.referencedocs = Referencedoc.query();
        vm.supportcases = Supportcase.query();
        vm.casetechnologyproperties = Casetechnologyproperty.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:technologyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.technology.id !== null) {
                Technology.update(vm.technology, onSaveSuccess, onSaveError);
            } else {
                Technology.save(vm.technology, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

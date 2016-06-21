(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologypropertyvalueDialogController', TechnologypropertyvalueDialogController);

    TechnologypropertyvalueDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Technologypropertyvalue', 'Technology', 'Technologyproperty'];

    function TechnologypropertyvalueDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Technologypropertyvalue, Technology, Technologyproperty) {
        var vm = this;
        vm.technologypropertyvalue = entity;
        vm.technologies = Technology.query();
        vm.technologyproperties = Technologyproperty.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:technologypropertyvalueUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.technologypropertyvalue.id !== null) {
                Technologypropertyvalue.update(vm.technologypropertyvalue, onSaveSuccess, onSaveError);
            } else {
                Technologypropertyvalue.save(vm.technologypropertyvalue, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologypropertyDialogController', TechnologypropertyDialogController);

    TechnologypropertyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Technologyproperty', 'Technologypropertyvalue'];

    function TechnologypropertyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Technologyproperty, Technologypropertyvalue) {
        var vm = this;
        vm.technologyproperty = entity;
        vm.technologypropertyvalues = Technologypropertyvalue.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:technologypropertyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.technologyproperty.id !== null) {
                Technologyproperty.update(vm.technologyproperty, onSaveSuccess, onSaveError);
            } else {
                Technologyproperty.save(vm.technologyproperty, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

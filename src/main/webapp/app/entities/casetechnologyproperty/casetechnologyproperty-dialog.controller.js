(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CasetechnologypropertyDialogController', CasetechnologypropertyDialogController);

    CasetechnologypropertyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Casetechnologyproperty', 'Supportcase', 'Technology'];

    function CasetechnologypropertyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Casetechnologyproperty, Supportcase, Technology) {
        var vm = this;
        vm.casetechnologyproperty = entity;
        vm.supportcases = Supportcase.query();
        vm.technologies = Technology.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:casetechnologypropertyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.casetechnologyproperty.id !== null) {
                Casetechnologyproperty.update(vm.casetechnologyproperty, onSaveSuccess, onSaveError);
            } else {
                Casetechnologyproperty.save(vm.casetechnologyproperty, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

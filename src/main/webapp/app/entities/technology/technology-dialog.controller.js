(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyDialogController', TechnologyDialogController);

    TechnologyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Technology', 'Technologypropertyvalue'];

    function TechnologyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Technology, Technologypropertyvalue) {
        var vm = this;
        vm.technology = entity;
        vm.technologypropertyvalues = Technologypropertyvalue.query();

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

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UpdatetypeDialogController', UpdatetypeDialogController);

    UpdatetypeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Updatetype', 'Caseupdate'];

    function UpdatetypeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Updatetype, Caseupdate) {
        var vm = this;
        vm.updatetype = entity;
        vm.caseupdates = Caseupdate.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:updatetypeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.updatetype.id !== null) {
                Updatetype.update(vm.updatetype, onSaveSuccess, onSaveError);
            } else {
                Updatetype.save(vm.updatetype, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

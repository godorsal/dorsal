(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseupdateDialogController', CaseupdateDialogController);

    CaseupdateDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Caseupdate', 'User', 'Supportcase', 'Updatetype'];

    function CaseupdateDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Caseupdate, User, Supportcase, Updatetype) {
        var vm = this;
        vm.caseupdate = entity;
        vm.users = User.query();
        vm.supportcases = Supportcase.query();
        vm.updatetypes = Updatetype.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:caseupdateUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.caseupdate.id !== null) {
                Caseupdate.update(vm.caseupdate, onSaveSuccess, onSaveError);
            } else {
                Caseupdate.save(vm.caseupdate, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.dateUpdated = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();

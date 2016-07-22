(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAccountDialogController', ExpertAccountDialogController);

    ExpertAccountDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'ExpertAccount', 'User', 'Expertbadge'];

    function ExpertAccountDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, ExpertAccount, User, Expertbadge) {
        var vm = this;
        vm.expertAccount = entity;
        vm.users = User.query();
        vm.expertbadges = Expertbadge.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:expertAccountUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.expertAccount.id !== null) {
                ExpertAccount.update(vm.expertAccount, onSaveSuccess, onSaveError);
            } else {
                ExpertAccount.save(vm.expertAccount, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.expertSince = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();

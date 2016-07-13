(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertbadgeDialogController', ExpertbadgeDialogController);

    ExpertbadgeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Expertbadge', 'ExpertAccount', 'Badge'];

    function ExpertbadgeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Expertbadge, ExpertAccount, Badge) {
        var vm = this;
        vm.expertbadge = entity;
        vm.expertaccounts = ExpertAccount.query();
        vm.badges = Badge.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:expertbadgeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.expertbadge.id !== null) {
                Expertbadge.update(vm.expertbadge, onSaveSuccess, onSaveError);
            } else {
                Expertbadge.save(vm.expertbadge, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

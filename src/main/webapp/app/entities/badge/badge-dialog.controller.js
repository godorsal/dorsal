(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('BadgeDialogController', BadgeDialogController);

    BadgeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Badge', 'Expertbadge'];

    function BadgeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Badge, Expertbadge) {
        var vm = this;
        vm.badge = entity;
        vm.expertbadges = Expertbadge.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:badgeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.badge.id !== null) {
                Badge.update(vm.badge, onSaveSuccess, onSaveError);
            } else {
                Badge.save(vm.badge, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

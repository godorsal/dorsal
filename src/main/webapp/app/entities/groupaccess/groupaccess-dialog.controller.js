(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('GroupaccessDialogController', GroupaccessDialogController);

    GroupaccessDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Groupaccess', 'User'];

    function GroupaccessDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Groupaccess, User) {
        var vm = this;
        vm.groupaccess = entity;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:groupaccessUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.groupaccess.id !== null) {
                Groupaccess.update(vm.groupaccess, onSaveSuccess, onSaveError);
            } else {
                Groupaccess.save(vm.groupaccess, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

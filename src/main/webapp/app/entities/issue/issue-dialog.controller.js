(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('IssueDialogController', IssueDialogController);

    IssueDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Issue', 'Supportcase'];

    function IssueDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Issue, Supportcase) {
        var vm = this;
        vm.issue = entity;
        vm.supportcases = Supportcase.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:issueUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.issue.id !== null) {
                Issue.update(vm.issue, onSaveSuccess, onSaveError);
            } else {
                Issue.save(vm.issue, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();

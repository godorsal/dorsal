(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('AttachmentModalController', AttachmentModalController);

    AttachmentModalController.$inject = ['$scope', '$timeout', '$uibModalInstance', 'drslCase', 'DrslAttachFileService'];

    function AttachmentModalController($scope, $timeout, $uibModalInstance, drslCase, DrslAttachFileService) {
        var vm = this;
        vm.case = drslCase;

        $timeout(function(){$scope.$broadcast('currentCaseSet')}, 1);

        $scope.$on('doneWithAttachments', function () {
            DrslAttachFileService.uploadAttachFileList(vm.case);
            DrslAttachFileService.deleteAttachments(vm.case);
            $uibModalInstance.dismiss('cancel');
        });

        $scope.$on('cancelAttachments', function () {
            $uibModalInstance.dismiss('cancel');
        });
    }
})();

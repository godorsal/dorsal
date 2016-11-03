(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SupportCaseReportRatingCommentModalController', SupportCaseReportRatingCommentModalController);

    SupportCaseReportRatingCommentModalController.$inject = ['$scope', '$timeout', '$uibModalInstance', 'report'];

    function SupportCaseReportRatingCommentModalController($scope, $timeout, $uibModalInstance, report) {
        var vm = this;
        vm.report = report;

        // $timeout(function(){$scope.$broadcast('currentCaseSet')}, 1);

        // $scope.$on('doneWithAttachments', function () {
        //     DrslAttachFileService.uploadAttachFileList(vm.case);
        //     DrslAttachFileService.deleteAttachments(vm.case);
        //     $uibModalInstance.dismiss('cancel');
        // });

        // $scope.$on('cancelAttachments', function () {
        //     $uibModalInstance.dismiss('cancel');
        // });
    }
})();

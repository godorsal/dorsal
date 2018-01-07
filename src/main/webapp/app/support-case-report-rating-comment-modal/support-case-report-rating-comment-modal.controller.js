(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SupportCaseReportRatingCommentModalController', SupportCaseReportRatingCommentModalController);

    SupportCaseReportRatingCommentModalController.$inject = ['$scope', '$timeout', '$uibModalInstance', 'report', '$document', '$translate'];

    function SupportCaseReportRatingCommentModalController($scope, $timeout, $uibModalInstance, report, $document, $translate) {
        var vm = this;
        vm.report = report;
        switch (report.rating.detailedReportObject.satisfaction) {
            case "65":
            vm.report.supportcase.finalPayment = Math.floor((0 / 100) * (vm.report.supportcase.estimateHours * 125));
            console.log(vm.report);

            break;
            case "75":
            vm.report.supportcase.finalPayment = Math.floor((50 / 100) * (vm.report.supportcase.estimateHours * 125));
            console.log(vm.report);

            break;
            case "85":
            vm.report.supportcase.finalPayment = Math.floor((90 / 100) * (vm.report.supportcase.estimateHours * 125));
            console.log(vm.report);

            break;
            case "100":
            vm.report.supportcase.finalPayment = Math.floor((100 / 100) * (vm.report.supportcase.estimateHours * 125));
            console.log(vm.report);

            break;
            default:
        }
        $document.keyup(function(e) {
            if (e.keyCode == 27) {
                $uibModalInstance.dismiss('cancel');
            }
        });
    }
})();

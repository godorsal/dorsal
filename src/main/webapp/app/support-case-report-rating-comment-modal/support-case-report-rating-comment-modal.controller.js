(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SupportCaseReportRatingCommentModalController', SupportCaseReportRatingCommentModalController);

    SupportCaseReportRatingCommentModalController.$inject = ['$scope', '$timeout', '$uibModalInstance', 'report', '$document', '$translate'];

    function SupportCaseReportRatingCommentModalController($scope, $timeout, $uibModalInstance, report, $document, $translate) {
        var vm = this;
        vm.report = report;

        $document.keyup(function(e) {
            if (e.keyCode == 27) {
                $uibModalInstance.dismiss('cancel');
            }
        });
    }
})();

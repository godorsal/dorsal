(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('SupportCaseReportRatingCommentModalService', SupportCaseReportRatingCommentModalService);

    SupportCaseReportRatingCommentModalService.$inject = ['$uibModal'];

    function SupportCaseReportRatingCommentModalService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open (report) {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/support-case-report-rating-comment-modal/support-case-report-rating-comment-modal.html',
                controller: 'SupportCaseReportRatingCommentModalController',
                controllerAs: 'vm',
                size:'sm',
                windowClass: 'drsl-rating-comment-modal',
                resolve: {
                    report: function(){ return report; }
                }
            });
            modalInstance.result.then(
                resetModal,
                resetModal
            );

            return modalInstance;
        }
    }
})();

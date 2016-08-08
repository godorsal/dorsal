(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SupportCaseReportDeleteController',SupportCaseReportDeleteController);

    SupportCaseReportDeleteController.$inject = ['$uibModalInstance', 'entity', 'SupportCaseReport'];

    function SupportCaseReportDeleteController($uibModalInstance, entity, SupportCaseReport) {
        var vm = this;
        vm.supportCaseReport = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            SupportCaseReport.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

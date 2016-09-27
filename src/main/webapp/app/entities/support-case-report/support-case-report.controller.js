(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SupportCaseReportController', SupportCaseReportController);

    SupportCaseReportController.$inject = ['$scope', '$state', 'SupportCaseReport'];

    function SupportCaseReportController ($scope, $state, SupportCaseReport) {
        var vm = this;
        vm.supportCaseReports = [];
        vm.loadAll = function() {
            SupportCaseReport.query(function(result) {
                vm.supportCaseReports = result;
            });
        };

        vm.loadAll();

    }
})();

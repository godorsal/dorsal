(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SupportCaseReportsController', SupportCaseReportController);

    SupportCaseReportController.$inject = ['Principal', 'Supportcase', 'ParseLinks', 'paginationConstants', 'JhiLanguageService', 'ManageSupportCaseReports', '$scope', 'SupportCaseReport'];

    function SupportCaseReportController(Principal, Supportcase, ParseLinks, paginationConstants, JhiLanguageService, ManageSupportCaseReports, $scope, SupportCaseReport) {
        var vm = this;
        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        vm.clear = clear;
        vm.currentAccount = null;
        vm.languages = null;
        vm.links = null;
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.page = 1;
        vm.setActive = setActive;
        vm.updateReport = updateReport;
        vm.totalItems = null;
        vm.users = [];
        vm.paidReports = [];
        vm.reports = [];
        vm.casesInProgress = [];
        vm.dateRange = '10';
        vm.supportcaseNumber = 5;

        vm.loadAll();


        JhiLanguageService.getAll().then(function (languages) {
            vm.languages = languages;
        });

        Principal.identity().then(function(account) {
            vm.currentAccount = account;
        });

        function loadAll () {
            vm.paidReports = [];
            vm.reports = [];
            vm.casesInProgress = [];
            ManageSupportCaseReports.query({page: vm.page - 1, size: paginationConstants.itemsPerPage, daysSince: vm.dateRange}, function (result, headers) {
                result.forEach(function(report){
                    if(report.isPaid === true){
                        vm.paidReports.push(report);
                    } else {
                        vm.reports.push(report);
                    }
                })
            });
            Supportcase.query({size: vm.supportcaseNumber}, function(result) {
                result.forEach(function(supportcase){
                    if(supportcase.status.id != 5){
                        vm.casesInProgress.push(supportcase);
                    }
                })
            });
        }

        function loadPage (page) {
            vm.page = page;
            vm.loadAll();
        }
        function updateReport(report){
            SupportCaseReport.update(report, onUpdateSuccess, onUpdateError);
        }
        function onUpdateSuccess(result){
            loadAll ();
        }
        function onUpdateError(result){
            console.log("ERROR", result);
        }
        function setActive (user, isActivated) {
            user.activated = isActivated;
            User.update(user, function () {
                vm.loadAll();
                vm.clear();
            });
        }

        function clear () {
            vm.user = {
                id: null, login: null, firstName: null, lastName: null, email: null,
                activated: null, langKey: null, createdBy: null, createdDate: null,
                lastModifiedBy: null, lastModifiedDate: null, resetDate: null,
                resetKey: null, authorities: null
            };
            vm.editForm.$setPristine();
            vm.editForm.$setUntouched();
        }
    }
})();

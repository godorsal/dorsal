(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SupportCaseReportsController', SupportCaseReportController);

    SupportCaseReportController.$inject = ['Principal', 'Supportcase', 'ParseLinks', 'paginationConstants', 'JhiLanguageService', 'ManageSupportCaseReports', '$scope', 'SupportCaseReport', 'toastr', 'DrslMetadata', 'SupportCaseReportRatingCommentModalService'];

    function SupportCaseReportController(Principal, Supportcase, ParseLinks, paginationConstants, JhiLanguageService, ManageSupportCaseReports, $scope, SupportCaseReport, toastr, DrslMetadata, SupportCaseReportRatingCommentModalService) {
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
        vm.openModal = openModal;
        vm.totalItems = null;
        vm.users = [];
        vm.paidReports = [];
        vm.reports = [];
        vm.casesInProgress = [];
        vm.dateRange = '10';
        vm.supportcaseNumber = 5;
        init();

        function init(){
            vm.loadAll();
            JhiLanguageService.getAll().then(function (languages) {
                vm.languages = languages;
            });

            Principal.identity().then(function(account) {
                vm.currentAccount = account;
            });

        }
        function loadAll () {
            //Sets the array of reports we want to view to blank, so we can requery them if whe have different parameters
            vm.paidReports = [];
            vm.reports = [];
            vm.casesInProgress = [];
            //Gets support case reports by the date range, from 10 days ago to 90 days ago
            ManageSupportCaseReports.query({page: vm.page - 1, size: paginationConstants.itemsPerPage, daysSince: vm.dateRange}, function (result, headers) {

                //Divide between paid and unpaid reports
                result.forEach(function(report){
                    report.payment = "$" + DrslMetadata.getTotalForRateAtHours(report.supportcase.timeOnCase);
                    // report.rating.ratingComments = report.rating.ratingComments.substring(0, 30) + "...";
                    if(report.isPaid === true){
                        vm.paidReports.push(report);
                    } else {
                        vm.reports.push(report);
                    }
                })
            });
            //Query the supportcases for the second tab
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
            toastr.error("Report Update Error")
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
        function openModal(report) {
            SupportCaseReportRatingCommentModalService.open(report)
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SupportCaseReportDetailController', SupportCaseReportDetailController);

    SupportCaseReportDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'SupportCaseReport', 'Supportcase', 'Rating'];

    function SupportCaseReportDetailController($scope, $rootScope, $stateParams, entity, SupportCaseReport, Supportcase, Rating) {
        var vm = this;
        vm.supportCaseReport = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:supportCaseReportUpdate', function(event, result) {
            vm.supportCaseReport = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

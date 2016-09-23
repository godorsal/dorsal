(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('ManageSupportCaseReports', ManageSupportCaseReports);

    ManageSupportCaseReports.$inject = ['$resource', 'DateUtils'];

    function ManageSupportCaseReports ($resource, DateUtils) {
        var resourceUrl =  'api/support-case-reports/query/:daysSince';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'update': { method:'PUT' }
        });
    }
})();

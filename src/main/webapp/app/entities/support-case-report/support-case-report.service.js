(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('SupportCaseReport', SupportCaseReport);

    SupportCaseReport.$inject = ['$resource', 'DateUtils'];

    function SupportCaseReport ($resource, DateUtils) {
        var resourceUrl =  'api/support-case-reports/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.datePaid = DateUtils.convertDateTimeFromServer(data.datePaid);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

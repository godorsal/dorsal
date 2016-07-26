(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('EscalateCase', EscalateCase);

    EscalateCase.$inject = ['$resource', 'DateUtils'];

    function EscalateCase ($resource, DateUtils) {
        var resourceUrl =  'api/escalate-cases/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateEscalated = DateUtils.convertDateTimeFromServer(data.dateEscalated);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

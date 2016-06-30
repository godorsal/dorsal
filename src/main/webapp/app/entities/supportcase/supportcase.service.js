(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Supportcase', Supportcase);

    Supportcase.$inject = ['$resource', 'DateUtils'];

    function Supportcase ($resource, DateUtils) {
        var resourceUrl =  'api/supportcases/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateCreated = DateUtils.convertDateTimeFromServer(data.dateCreated);
                    data.dateLastUpdate = DateUtils.convertDateTimeFromServer(data.dateLastUpdate);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

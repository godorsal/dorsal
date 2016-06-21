(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Status', Status);

    Status.$inject = ['$resource'];

    function Status ($resource) {
        var resourceUrl =  'api/statuses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

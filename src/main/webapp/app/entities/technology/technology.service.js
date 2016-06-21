(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Technology', Technology);

    Technology.$inject = ['$resource'];

    function Technology ($resource) {
        var resourceUrl =  'api/technologies/:id';

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

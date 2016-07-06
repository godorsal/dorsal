(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('GlobalMetadata', GlobalMetadata);

    GlobalMetadata.$inject = ['$resource'];

    function GlobalMetadata ($resource) {
        var resourceUrl =  'api/global-metadata/:id';

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

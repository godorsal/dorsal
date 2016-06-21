(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Issue', Issue);

    Issue.$inject = ['$resource'];

    function Issue ($resource) {
        var resourceUrl =  'api/issues/:id';

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

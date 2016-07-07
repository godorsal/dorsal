(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('SharedCase', SharedCase);

    SharedCase.$inject = ['$resource'];

    function SharedCase ($resource) {
        var resourceUrl =  'api/shared-cases/:id';

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

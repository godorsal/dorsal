(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Badge', Badge);

    Badge.$inject = ['$resource'];

    function Badge ($resource) {
        var resourceUrl =  'api/badges/:id';

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

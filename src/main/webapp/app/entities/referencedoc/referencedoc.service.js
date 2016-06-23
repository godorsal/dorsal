(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Referencedoc', Referencedoc);

    Referencedoc.$inject = ['$resource'];

    function Referencedoc ($resource) {
        var resourceUrl =  'api/referencedocs/:id';

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

(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Technologypropertyvalue', Technologypropertyvalue);

    Technologypropertyvalue.$inject = ['$resource'];

    function Technologypropertyvalue ($resource) {
        var resourceUrl =  'api/technologypropertyvalues/:id';

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

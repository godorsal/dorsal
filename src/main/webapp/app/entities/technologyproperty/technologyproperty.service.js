(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Technologyproperty', Technologyproperty);

    Technologyproperty.$inject = ['$resource'];

    function Technologyproperty ($resource) {
        var resourceUrl =  'api/technologyproperties/:id';

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

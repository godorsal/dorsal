(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Casetechnologyproperty', Casetechnologyproperty);

    Casetechnologyproperty.$inject = ['$resource'];

    function Casetechnologyproperty ($resource) {
        var resourceUrl =  'api/casetechnologyproperties/:id';

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

(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Groupaccess', Groupaccess);

    Groupaccess.$inject = ['$resource'];

    function Groupaccess ($resource) {
        var resourceUrl =  'api/groupaccesses/:id';

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

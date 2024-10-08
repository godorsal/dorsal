(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Useraccount', Useraccount);

    Useraccount.$inject = ['$resource'];

    function Useraccount ($resource) {
        var resourceUrl =  'api/useraccounts/:id';

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

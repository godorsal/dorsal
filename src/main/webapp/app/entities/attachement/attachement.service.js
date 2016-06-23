(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Attachement', Attachement);

    Attachement.$inject = ['$resource'];

    function Attachement ($resource) {
        var resourceUrl =  'api/attachements/:id';

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

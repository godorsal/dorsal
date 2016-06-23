(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Expertbadge', Expertbadge);

    Expertbadge.$inject = ['$resource'];

    function Expertbadge ($resource) {
        var resourceUrl =  'api/expertbadges/:id';

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

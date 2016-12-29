(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('ExpertAttribute', ExpertAttribute);

    ExpertAttribute.$inject = ['$resource'];

    function ExpertAttribute ($resource) {
        var resourceUrl =  'api/expert-attributes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

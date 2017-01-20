(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('ExpertPool', ExpertPool);

    ExpertPool.$inject = ['$resource'];

    function ExpertPool ($resource) {
        var resourceUrl =  'api/expert-pools/:id';

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

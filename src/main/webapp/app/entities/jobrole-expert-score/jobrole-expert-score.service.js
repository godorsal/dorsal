(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('JobroleExpertScore', JobroleExpertScore);

    JobroleExpertScore.$inject = ['$resource'];

    function JobroleExpertScore ($resource) {
        var resourceUrl =  'api/jobrole-expert-scores/:id';

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

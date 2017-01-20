(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('JobRole', JobRole);

    JobRole.$inject = ['$resource'];

    function JobRole ($resource) {
        var resourceUrl =  'api/job-roles/:id';

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

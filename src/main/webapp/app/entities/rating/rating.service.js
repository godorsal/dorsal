(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Rating', Rating);

    Rating.$inject = ['$resource', 'DateUtils'];

    function Rating ($resource, DateUtils) {
        var resourceUrl =  'api/ratings/:supportcase/:id';
        // var resourceUrl =  'api/ratings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateRated = DateUtils.convertDateTimeFromServer(data.dateRated);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

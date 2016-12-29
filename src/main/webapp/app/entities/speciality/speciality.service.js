(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Speciality', Speciality);

    Speciality.$inject = ['$resource'];

    function Speciality ($resource) {
        var resourceUrl =  'api/specialities/:id';

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

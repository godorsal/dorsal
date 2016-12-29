(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('SpecialityExpertScore', SpecialityExpertScore);

    SpecialityExpertScore.$inject = ['$resource'];

    function SpecialityExpertScore ($resource) {
        var resourceUrl =  'api/speciality-expert-scores/:id';

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

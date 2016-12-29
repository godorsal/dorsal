(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('TechnologyExpertScore', TechnologyExpertScore);

    TechnologyExpertScore.$inject = ['$resource'];

    function TechnologyExpertScore ($resource) {
        var resourceUrl =  'api/technology-expert-scores/:id';

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

(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('SkillExpertScore', SkillExpertScore);

    SkillExpertScore.$inject = ['$resource'];

    function SkillExpertScore ($resource) {
        var resourceUrl =  'api/skill-expert-scores/:id';

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

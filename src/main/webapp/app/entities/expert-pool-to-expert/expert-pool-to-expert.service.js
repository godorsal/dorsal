(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('ExpertPoolToExpert', ExpertPoolToExpert);

    ExpertPoolToExpert.$inject = ['$resource'];

    function ExpertPoolToExpert ($resource) {
        var resourceUrl =  'api/expert-pool-to-experts/:id';

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

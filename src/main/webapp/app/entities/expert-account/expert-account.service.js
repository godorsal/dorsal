(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('ExpertAccount', ExpertAccount);

    ExpertAccount.$inject = ['$resource'];

    function ExpertAccount ($resource) {
        var resourceUrl =  'api/expert-accounts/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

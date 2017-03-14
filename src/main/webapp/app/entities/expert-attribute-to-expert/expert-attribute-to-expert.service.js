(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('ExpertAttributeToExpert', ExpertAttributeToExpert);

    ExpertAttributeToExpert.$inject = ['$resource'];

    function ExpertAttributeToExpert ($resource) {
        var resourceUrl =  'api/expert-attribute-to-experts/:param/:id';
        // var resourceUrl =  'api/expert-attribute-to-experts/:id';

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

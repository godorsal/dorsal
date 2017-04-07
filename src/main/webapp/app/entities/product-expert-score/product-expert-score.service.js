(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('ProductExpertScore', ProductExpertScore);

    ProductExpertScore.$inject = ['$resource'];

    function ProductExpertScore ($resource) {
        var resourceUrl =  'api/product-expert-scores/:param/:id';
        // var resourceUrl =  'api/product-expert-scores/:id';

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

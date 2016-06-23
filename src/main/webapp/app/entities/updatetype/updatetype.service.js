(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Updatetype', Updatetype);

    Updatetype.$inject = ['$resource'];

    function Updatetype ($resource) {
        var resourceUrl =  'api/updatetypes/:id';

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

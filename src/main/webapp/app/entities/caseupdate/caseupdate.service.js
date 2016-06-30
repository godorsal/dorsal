(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('Caseupdate', Caseupdate);

    Caseupdate.$inject = ['$resource', 'DateUtils'];

    function Caseupdate ($resource, DateUtils) {
        var resourceUrl =  'api/caseupdates/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateUpdated = DateUtils.convertDateTimeFromServer(data.dateUpdated);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

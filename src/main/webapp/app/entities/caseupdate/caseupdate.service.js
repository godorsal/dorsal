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
                    data.dateupdated = DateUtils.convertDateTimeFromServer(data.dateupdated);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

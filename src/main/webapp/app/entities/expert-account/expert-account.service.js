(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('ExpertAccount', ExpertAccount);

    ExpertAccount.$inject = ['$resource', 'DateUtils'];

    function ExpertAccount ($resource, DateUtils) {
        // var resourceUrl =  'api/expert-accounts/experts';
        // var resourceUrl =  'api/expert-accounts/:query';
        var resourceUrl =  'api/expert-accounts/:param/:options';
        // var resourceUrl =  'api/expert-accounts/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.expertSince = DateUtils.convertDateTimeFromServer(data.expertSince);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

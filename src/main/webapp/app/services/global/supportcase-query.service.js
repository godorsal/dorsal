(function() {
    'use strict';
    angular
        .module('dorsalApp')
        .factory('SupportcaseQuery', SupportcaseQuery);

    SupportcaseQuery.$inject = ['$resource', 'DateUtils'];

    function SupportcaseQuery ($resource, DateUtils) {
        var resourceUrl =  'api/supportcases/shared';
        // var resourceUrl =  'api/supportcases/:id';
        this.resourceUrl =  resourceUrl;
        // this.ownerResourceUrl =  'api/supportcases/owner';
        // this.expertResourceUrl =  'api/supportcases/expert';
        // this.supportcaseResourceUrl =  'api/supportcases/shared';
        return $resource(this.resourceUrl, {}, {
        // return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateCreated = DateUtils.convertDateTimeFromServer(data.dateCreated);
                    data.dateLastUpdate = DateUtils.convertDateTimeFromServer(data.dateLastUpdate);
                    data.expectedCompletionDate = DateUtils.convertDateTimeFromServer(data.expectedCompletionDate);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

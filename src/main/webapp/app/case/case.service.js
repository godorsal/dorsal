(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('CaseService', CaseService);

    CaseService.$inject = ['$q', 'Supportcase', 'StatusModel', 'Principal'];

    function CaseService($q, Supportcase, StatusModel, Principal) {
        var service = {};

        service.getEntityData = function () {
            var deferred = $q.defer(),
                supportCase = Supportcase.query().$promise,
                identity = Principal.identity(),
                statusStates = StatusModel.getStates();

            // Combine multiple requests into one
            $q.all([supportCase, identity, statusStates]).then(function (data) {
                deferred.resolve(processEntityData(data));
            });

            return deferred.promise;
        };

        return service;

        function processEntityData(entityData) {
            return {
                "supportCase": entityData[0],
                "identity": entityData[1],
                "statusStates": entityData[2]
            };
        }
    }
})();

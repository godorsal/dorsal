(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('StatusModel', StatusModel);

    StatusModel.$inject = ['$q', '_', 'Status'];

    function StatusModel($q, _, Status) {
        var service = {};
        service.__states = [];

        service.getStates = function () {
            var deferred = $q.defer();

            if (service.__states.length) {
                deferred.resolve(service.__states);
            } else {
                Status.query(function (data) {
                    service.__states = data;
                    deferred.resolve(service.__states);
                });
            }
            return deferred.promise;
        };

        service.getState = function (statusName) {
            return _.filter(service.__states, {'name': statusName.toUpperCase()})[0];
        };

        service.checkCaseStatus = function (caseStatus, statusName) {
            if (caseStatus && caseStatus.name) {
                var status = _.filter(service.__states, {'name': statusName.toUpperCase()})[0];
                return (status && (caseStatus.name.toUpperCase() === statusName.toUpperCase()));
            }

            return false;
        };

        service.getStatusIndex = function (caseStatus) {
            var statusName = (caseStatus && caseStatus.name) ? caseStatus.name.toLowerCase() : '',
                index;

            switch (statusName) {
                case 'closed':
                    index = 4;
                    break;
                case 'completed':
                    index = 3;
                    break;
                case 'working':
                    index = 2;
                    break;
                case 'estimated':
                    index = 1;
                    break;
                default:
                    index = 0;
            }

            return index;
        };

        return service;
    }
})();

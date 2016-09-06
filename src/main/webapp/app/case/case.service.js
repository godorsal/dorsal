(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('CaseService', CaseService);

    CaseService.$inject = ['$q', 'Supportcase', 'StatusModel', 'Principal', 'Badge', 'Expertbadge', 'DrslMetadata'];

    function CaseService($q, Supportcase, StatusModel, Principal, Badge, Expertbadge, DrslMetadata) {
        var service = {};

        service.getEntityData = function (config) {
            var deferred = $q.defer(),
                dataToFetch = [],
                dataToTypes = [];

            dataToFetch.push(Supportcase.query().$promise);
            dataToTypes.push('supportCase');

            if (config.getCurrentUser) {
                dataToFetch.push(Principal.identity());
                dataToTypes.push('identity');
            }

            if (config.getStatusStates) {
                dataToFetch.push(StatusModel.getStates());
                dataToTypes.push('statusStates');
            }

            if (config.getBadges) {
                dataToFetch.push(Badge.query().$promise);
                dataToTypes.push('badges');
            }

            // Combine multiple requests into one
            $q.all(dataToFetch).then(function (data) {
                deferred.resolve(processEntityData(data, dataToTypes));
            });

            return deferred.promise;
        };

        service.getExpertBadges = function (expertAccountID) {
            var deferred = $q.defer();

            Expertbadge.query().$promise.then(function(data){
                var i, badges = [], expertBadgeResources = [];

                for (i=0; i<data.length; i++) {
                    if (data[i].expertaccount.id === expertAccountID){
                        expertBadgeResources.push(data[i]);
                        data[i].badge.hide = (DrslMetadata.expertBadgeCount > data[i].expertBadgeCount);
                        badges.push(data[i].badge);
                    }
                }

                deferred.resolve({'badges': badges.sort(sortBadges), 'expertBadgeResources': expertBadgeResources});
            });

            return deferred.promise;
        };

        return service;

        function processEntityData(entityData, dataToTypes) {
            var dataOut = {}, dataType, i;

            for (i = 0; i<dataToTypes.length; i++){
                dataType = dataToTypes[i];

                if (dataType === 'badges') {
                    dataOut[dataToTypes[i]] = entityData[i].sort(sortBadges);
                } else if (dataType === 'supportCase') {
                    dataOut[dataToTypes[i]] = entityData[i].sort(sortCases);
                } else {
                    dataOut[dataToTypes[i]] = entityData[i];
                }
                dataOut[dataToTypes[i]] = entityData[i];
            }

            return dataOut;
        }

        function sortCases(a, b) {
            return getDateMilliseconds(b) - getDateMilliseconds(a);
        }

        function getDateMilliseconds(suppportCase) {
            var date = 0;

            if (suppportCase) {
                var dateCreated = suppportCase.dateCreated.replace(/[A-Z]/gi, ' '),
                    dateParts = dateCreated.split('-'),
                    timeParts = dateCreated.split(' ')[1].split(':'),
                    secondParts = timeParts[2].split('.');

                date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].split(' ')[0], timeParts[0], timeParts[1], secondParts[0]);
            }

            return date.valueOf();
        }

        function sortBadges(a, b) {
            return a.ordinal - b.ordinal
        }
    }
})();

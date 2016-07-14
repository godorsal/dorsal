(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('CaseService', CaseService);

    CaseService.$inject = ['$q', 'Supportcase', 'StatusModel', 'Principal', 'Badge', 'Expertbadge', 'DrslMetadata'];

    function CaseService($q, Supportcase, StatusModel, Principal, Badge, Expertbadge, DrslMetadata) {
        var service = {};

        service.getEntityData = function () {
            var deferred = $q.defer(),
                supportCase = Supportcase.query().$promise,
                identity = Principal.identity(),
                badges = Badge.query().$promise,
                statusStates = StatusModel.getStates();

            // Combine multiple requests into one
            $q.all([supportCase, identity, statusStates, badges]).then(function (data) {
                deferred.resolve(processEntityData(data));
            });

            return deferred.promise;
        };

        service.getExpertBadges = function (expertAccountID) {
            var deferred = $q.defer();

            Expertbadge.query().$promise.then(function(data){
                var i, badges = [];

                for (i=0; i<data.length; i++) {
                    if (data[i].expertaccount.id === expertAccountID){
                        data[i].badge.hide = (DrslMetadata.expertBadgeCount > data[i].expertBadgeCount);
                        badges.push(data[i].badge);
                    }
                }

                deferred.resolve(badges.sort(sortBadges));
            });

            return deferred.promise;
        };

        return service;

        function processEntityData(entityData) {
            return {
                "supportCase": entityData[0],
                "identity": entityData[1],
                "statusStates": entityData[2],
                "badges": entityData[3].sort(sortBadges)
            };
        }

        function sortBadges(a, b) {
            return a.ordinal - b.ordinal
        }
    }
})();

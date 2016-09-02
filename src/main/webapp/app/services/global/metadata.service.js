(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .factory('DrslMetadata', DrslMetadata);

    DrslMetadata.$inject = ['GlobalMetadata', '$q'];

    function DrslMetadata(GlobalMetadata, $q) {
        var service = {};

        service.getTotalForRateAtHours = function (hours) {
            return service.expertRate * hours;
        };
        GlobalMetadata.query(function (result) {
            var i, metaItem;
            for (i = 0; i < result.length; i++) {
                metaItem = result[i];
                switch (metaItem.valueType) {
                    case 'ISINTEGER':
                    service[camelCase(metaItem.name)] = parseInt(metaItem.value);
                    break;
                    default:
                    service[camelCase(metaItem.name)] = metaItem.value;
                    break;
                }
            }
        });
        
        return service;
    }

    function camelCase(input) {
        input = input.replace (/_/g, '-');
        return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
            return group1.toUpperCase();
        });
    }
})();

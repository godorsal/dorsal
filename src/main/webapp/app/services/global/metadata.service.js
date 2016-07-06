(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslMetadata', DrslMetadata);

    DrslMetadata.$inject = [];

    function DrslMetadata () {
        var service = {};
        service.expertRate = null;
        service.minimumCaseLength = null;

        service.setExpertRate = function(rate) {
            service.expertRate = rate;
        };

        service.setMinimumCaseLength = function (minCaseLength) {
            service.minimumCaseLength =  minCaseLength;
        };

        service.getTotalForRateAtHours = function (hours) {
            return service.expertRate * hours;
        };

        return service;
    }
})();

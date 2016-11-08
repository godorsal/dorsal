(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslNewCaseService', DrslNewCaseService);

    DrslNewCaseService.$inject = [];

    function DrslNewCaseService() {
        var service = {};

        service.newCaseId = null;
        service.newCase = null;
        service._hasConsumedNewCaseId = false;

        service.setNewCaseId = function (caseId) {
            service._hasConsumedNewCaseId = false;
            service.newCaseId = caseId;
        };
        service.setNewCase = function (newCase) {
            service.newCase = newCase;
        };

        /**
         * Gets the new case id (string) only once, then it's consumed and a null is returned.
         * @returns {string|null}
         */
        service.getConsumableNewCaseId = function () {
            var caseId = null;

            if (!service._hasConsumedNewCaseId) {
                caseId = service.newCaseId;
                service._hasConsumedNewCaseId = true;
            }

            return caseId;
        };

        return service;
    }
})();

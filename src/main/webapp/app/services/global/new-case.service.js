(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslNewCaseService', DrslNewCaseService);

    DrslNewCaseService.$inject = [];

    function DrslNewCaseService() {
        var service = {};

        service.setNewCaseId = function (caseId) {
            service.newCaseId = caseId;
            console.log(caseId);
        };

        return service;
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('ConciergeService', ConciergeService);

    ConciergeService.$inject = ['$resource'];

    function ConciergeService ($resource) {
        var service = $resource('content/json/concierge.service.json', {}, {
            'get': {
                method: 'GET',
                isArray: true
            }
        });

        return service;
    }
})();

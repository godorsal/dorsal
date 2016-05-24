(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('CaseService', CaseService);

    CaseService.$inject = ['$resource'];

    function CaseService ($resource) {
        var service = $resource('content/json/case.service.json', {}, {
            'get': {
                method: 'GET',
                isArray: true
            },
            'getExpert': {
                url: 'content/json/expert.service.json',
                method: 'GET',
                isArray: true
            }
        });

        return service;
    }
})();

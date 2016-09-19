(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('ManageUser', ManageUser);

    ManageUser.$inject = ['$resource'];

    function ManageUser ($resource) {
        var service = $resource('api/users/:type/:value', {}, {
            'get': {method: 'GET'}
        });

        return service;
    }
})();

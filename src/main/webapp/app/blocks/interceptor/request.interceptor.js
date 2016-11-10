(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('requestInterceptor', requestInterceptor);

    requestInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage'];

    function requestInterceptor ($rootScope, $q, $location, $localStorage, $sessionStorage) {
        var service = {
            request: request
        };

        return service;

        function request (config, token) {
            /*jshint camelcase: false */
            config.headers = config.headers || {};

            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }
    }
})();

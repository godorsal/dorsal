(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage'];

    function authInterceptor ($rootScope, $q, $location, $localStorage, $sessionStorage) {
        var service = {
            request: request
        };

        return service;

        function request (config) {
            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;

            if(config.headers.Authorization){
                return config;
            }
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        }
    }
})();

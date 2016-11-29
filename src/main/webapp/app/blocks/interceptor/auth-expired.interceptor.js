(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('authExpiredInterceptor', authExpiredInterceptor);


    authExpiredInterceptor.$inject = ['$rootScope', '$q', '$injector', '$localStorage', '$sessionStorage'];

    function authExpiredInterceptor($rootScope, $q, $injector, $localStorage, $sessionStorage) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError(response) {
            if (response.status === 401) {
                delete $localStorage.authenticationToken;
                delete $sessionStorage.authenticationToken;
                var Principal = $injector.get('Principal');
                if (Principal.isAuthenticated()) {
                    var Auth = $injector.get('Auth');
                    Auth.authorize(true);
                }
            }
            if (response.status === 429) {
                // console.log("RAN OUT OF REQUESTS, SWITCH TOKEN?", response);
            }
            return $q.reject(response);
        }
    }
})();

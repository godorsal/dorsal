(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SocialAuthController', SocialAuthController);

    SocialAuthController.$inject = ['$state', '$cookies', 'Auth'];

    function SocialAuthController($state, $cookies, Auth) {
        var token = $cookies.get('social-authentication');
console.log("SOCAACIL AUTH CONTROLLLLER");
        Auth.loginWithToken(token, false).then(function () {
            console.log("LOGGGIN WITH TOKENE");
            // $cookies.remove('social-authentication');
            // Auth.authorize(true);
        }, function () {
            $state.go('social-register', {'success': 'false'});
        });
    }
})();

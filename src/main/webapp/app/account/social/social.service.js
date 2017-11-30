(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('SocialService', SocialService);

    SocialService.$inject = ['$document'];
console.log("SOCIAL SERVICE . JS");
    function SocialService ($document) {
        var socialService = {
            getProviderSetting: getProviderSetting,
            getProviderURL: getProviderURL,
            getCSRF: getCSRF
        };

        return socialService;

        function getProviderSetting (provider) {
            switch(provider) {
            case 'google': return 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
            case 'facebook': return 'public_profile,email';
            case 'twitter': return '';
            case 'github': return 'https://github.com/login/oauth/authorize';
                // jhipster-needle-add-social-button
            default: return 'Provider setting not defined';
            }
        }

        function getProviderURL (provider) {
            console.log("PROVIDER URL", provider);
            return 'signin/' + provider;
        }

        function getCSRF () {
            /* globals document */
            var name = 'CSRF-TOKEN=';
            var ca = $document[0].cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) !== -1) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        }
    }
})();

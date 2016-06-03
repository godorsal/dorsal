(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('ElementFocusService', ElementFocusService);

    ElementFocusService.$inject = ['$timeout', '$window'];

    function ElementFocusService($timeout, $window) {
        var service = function (id) {
            $timeout(function () {
                var element = $window.document.getElementById(id);
                if (element) {
                    element.focus();
                }
            });
        };

        return service;
    }
})();

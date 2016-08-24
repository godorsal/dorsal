(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslBrowserDetectService', DrslBrowserDetectService);

    function DrslBrowserDetectService() {
        var service = {};

        // Opera 8.0+
        service.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        service.isFirefox = typeof InstallTrigger !== 'undefined';

        // At least Safari 3+: "[object HTMLElementConstructor]"
        service.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

        // Internet Explorer 6-11
        service.isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        service.isEdge = !service.isIE && !!window.StyleMedia;

        // Not MS
        service.isNotMS = !service.isIE && !service.isEdge;

        // Chrome 1+
        service.isChrome = !!window.chrome && !!window.chrome.webstore;

        // Blink engine detection
        service.isBlink = (service.isChrome || service.isOpera) && !!window.CSS;

        return service;
    }
})();

(function() {
    'use strict';

    angular
    .module('dorsalApp', [
        'ngStorage',
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'ngResource',
        'ngCookies',
        'ngAria',
        'ngCacheBuster',
        'ngFileUpload',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'ui.router',
        'infinite-scroll',
        'toastr',
        // jhipster-needle-angularjs-add-module JHipster will add new module here
        // 'angular-loading-bar',
        'ngAnimate'
    ])
    .constant('_', window._)
    // use in views, ng-repeat="x in _.range(3)"
    .run(run);

    run.$inject = ['stateHandler', 'translationHandler', '$rootScope'];

    function run(stateHandler, translationHandler, $rootScope) {
        $rootScope._ = window._;
        stateHandler.initialize();
        translationHandler.initialize();
    }
})();

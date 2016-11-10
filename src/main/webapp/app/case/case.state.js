(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$httpProvider'];

    function stateConfig($stateProvider, $httpProvider) {
        $stateProvider.state('case', {
            parent: 'app',
            url: '/case',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/case/case.html',
                    controller: 'CaseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('case');
                    return $translate.refresh();
                }]
            }
        });
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
})();

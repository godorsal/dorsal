(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
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
    }
})();

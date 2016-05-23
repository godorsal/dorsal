(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('concierge', {
            parent: 'app',
            url: '/concierge/:type',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/concierge/concierge.html',
                    controller: 'ConciergeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('concierge');
                    return $translate.refresh();
                }]
            }
        });
    }
})();

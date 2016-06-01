(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('leaderboard', {
            parent: 'app',
            url: '/leaderboard',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/leaderboard/leaderboard.html',
                    controller: 'LeaderboardController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('leaderboard');
                    return $translate.refresh();
                }]
            }
        });
    }
})();

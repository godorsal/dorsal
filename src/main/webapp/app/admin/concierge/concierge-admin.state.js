(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
        $stateProvider.state('conciergeAdmin', {
            parent: 'admin',
            url: '/conciergeAdmin',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'concierge.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/concierge/conciergeAdmin.html',
					controller: 'ConciergeAdminController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', function ($translate) {
                    return $translate.refresh();
                }]
            }
        });
    }
})();

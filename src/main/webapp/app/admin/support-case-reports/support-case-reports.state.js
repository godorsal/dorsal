(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('support-case-reports', {
            parent: 'admin',
            url: '/support-case-reports',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'support-case-reports.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/support-case-reports/support-case-reports.html',
                    controller: 'SupportCaseReportsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('adminSupportCaseReport');
                    return $translate.refresh();
                }]
            }
        })
	}
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('selfAssesmentJobRole', {
            parent: 'account',
            url: '/self-assesment/job-role',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.selfAssesment'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/self-assesment/job-roles/sa-job-role.html',
                    controller: 'SelfAssesmentJobRoleController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                // translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                //     $translatePartialLoader.addPart('selfAssesmentJobRole');
                //     return $translate.refresh();
                // }]
            }
        });
    }
})();

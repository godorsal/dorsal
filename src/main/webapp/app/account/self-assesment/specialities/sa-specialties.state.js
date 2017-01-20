(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('selfAssesmentSpecialties', {
            parent: 'account',
            url: '/self-assesment/specialities',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.selfAssesment'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/self-assesment/specialities/sa-specialties.html',
                    controller: 'SelfAssesmentSpecialtiesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                // translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                //     $translatePartialLoader.addPart('selfAssesmentSpecialties');
                //     return $translate.refresh();
                // }]
            }
        });
    }
})();

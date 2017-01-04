(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('selfAssesmentSkills', {
            parent: 'account',
            url: '/self-assesment/skills',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.selfAssesment'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/self-assesment/skills/sa-skills.html',
                    controller: 'SelfAssesmentSkillsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                // translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                //     $translatePartialLoader.addPart('selfAssesmentSkills');
                //     return $translate.refresh();
                // }]
            }
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('expert-groups', {
            parent: 'admin',
            url: '/expert-groups',
            data: {
                authorities: [],
                pageTitle: 'expert-groups.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/expert-groups/expert-groups.html',
                    controller: 'ExpertGroupsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {

                    // $translatePartialLoader.addPart('expertPool');
                    // $translatePartialLoader.addPart('expertSelection');
                    $translatePartialLoader.addPart('expertGroup');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
	}
})();

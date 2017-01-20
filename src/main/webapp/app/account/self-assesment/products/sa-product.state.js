(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('selfAssesmentProduct', {
            parent: 'account',
            url: '/self-assesment/product',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'global.menu.account.selfAssesment'
            },
            views: {
                'content@': {
                    templateUrl: 'app/account/self-assesment/products/sa-product.html',
                    controller: 'SelfAssesmentProductController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                // translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                //     $translatePartialLoader.addPart('selfAssesmentProduct');
                //     return $translate.refresh();
                // }]
            }
        });
    }
})();

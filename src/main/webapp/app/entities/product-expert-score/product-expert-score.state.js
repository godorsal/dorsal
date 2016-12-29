(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('product-expert-score', {
            parent: 'entity',
            url: '/product-expert-score',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.productExpertScore.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/product-expert-score/product-expert-scores.html',
                    controller: 'ProductExpertScoreController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('productExpertScore');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('product-expert-score-detail', {
            parent: 'entity',
            url: '/product-expert-score/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.productExpertScore.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/product-expert-score/product-expert-score-detail.html',
                    controller: 'ProductExpertScoreDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('productExpertScore');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ProductExpertScore', function($stateParams, ProductExpertScore) {
                    return ProductExpertScore.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'product-expert-score',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('product-expert-score-detail.edit', {
            parent: 'product-expert-score-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product-expert-score/product-expert-score-dialog.html',
                    controller: 'ProductExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ProductExpertScore', function(ProductExpertScore) {
                            return ProductExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('product-expert-score.new', {
            parent: 'product-expert-score',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product-expert-score/product-expert-score-dialog.html',
                    controller: 'ProductExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                score: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('product-expert-score', null, { reload: 'product-expert-score' });
                }, function() {
                    $state.go('product-expert-score');
                });
            }]
        })
        .state('product-expert-score.edit', {
            parent: 'product-expert-score',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product-expert-score/product-expert-score-dialog.html',
                    controller: 'ProductExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ProductExpertScore', function(ProductExpertScore) {
                            return ProductExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('product-expert-score', null, { reload: 'product-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('product-expert-score.delete', {
            parent: 'product-expert-score',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/product-expert-score/product-expert-score-delete-dialog.html',
                    controller: 'ProductExpertScoreDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ProductExpertScore', function(ProductExpertScore) {
                            return ProductExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('product-expert-score', null, { reload: 'product-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('expert-pool', {
            parent: 'entity',
            url: '/expert-pool',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertPool.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-pool/expert-pools.html',
                    controller: 'ExpertPoolController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertPool');
                    $translatePartialLoader.addPart('expertSelection');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('expert-pool-detail', {
            parent: 'entity',
            url: '/expert-pool/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertPool.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-pool/expert-pool-detail.html',
                    controller: 'ExpertPoolDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertPool');
                    $translatePartialLoader.addPart('expertSelection');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ExpertPool', function($stateParams, ExpertPool) {
                    return ExpertPool.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'expert-pool',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('expert-pool-detail.edit', {
            parent: 'expert-pool-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-pool/expert-pool-dialog.html',
                    controller: 'ExpertPoolDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertPool', function(ExpertPool) {
                            return ExpertPool.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-pool.new', {
            parent: 'expert-pool',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-pool/expert-pool-dialog.html',
                    controller: 'ExpertPoolDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                expertSelection: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('expert-pool', null, { reload: 'expert-pool' });
                }, function() {
                    $state.go('expert-pool');
                });
            }]
        })
        .state('expert-pool.edit', {
            parent: 'expert-pool',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-pool/expert-pool-dialog.html',
                    controller: 'ExpertPoolDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertPool', function(ExpertPool) {
                            return ExpertPool.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-pool', null, { reload: 'expert-pool' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-pool.delete', {
            parent: 'expert-pool',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-pool/expert-pool-delete-dialog.html',
                    controller: 'ExpertPoolDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ExpertPool', function(ExpertPool) {
                            return ExpertPool.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-pool', null, { reload: 'expert-pool' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

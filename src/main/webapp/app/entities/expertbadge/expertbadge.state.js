(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('expertbadge', {
            parent: 'entity',
            url: '/expertbadge',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertbadge.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expertbadge/expertbadges.html',
                    controller: 'ExpertbadgeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertbadge');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('expertbadge-detail', {
            parent: 'entity',
            url: '/expertbadge/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertbadge.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expertbadge/expertbadge-detail.html',
                    controller: 'ExpertbadgeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertbadge');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Expertbadge', function($stateParams, Expertbadge) {
                    return Expertbadge.get({id : $stateParams.id});
                }]
            }
        })
        .state('expertbadge.new', {
            parent: 'expertbadge',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expertbadge/expertbadge-dialog.html',
                    controller: 'ExpertbadgeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                expertBadgeCount: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('expertbadge', null, { reload: true });
                }, function() {
                    $state.go('expertbadge');
                });
            }]
        })
        .state('expertbadge.edit', {
            parent: 'expertbadge',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expertbadge/expertbadge-dialog.html',
                    controller: 'ExpertbadgeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Expertbadge', function(Expertbadge) {
                            return Expertbadge.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('expertbadge', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expertbadge.delete', {
            parent: 'expertbadge',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expertbadge/expertbadge-delete-dialog.html',
                    controller: 'ExpertbadgeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Expertbadge', function(Expertbadge) {
                            return Expertbadge.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('expertbadge', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('status', {
            parent: 'entity',
            url: '/status',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.status.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/status/statuses.html',
                    controller: 'StatusController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('status');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('status-detail', {
            parent: 'entity',
            url: '/status/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.status.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/status/status-detail.html',
                    controller: 'StatusDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('status');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Status', function($stateParams, Status) {
                    return Status.get({id : $stateParams.id});
                }]
            }
        })
        .state('status.new', {
            parent: 'status',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/status/status-dialog.html',
                    controller: 'StatusDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                code: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('status', null, { reload: true });
                }, function() {
                    $state.go('status');
                });
            }]
        })
        .state('status.edit', {
            parent: 'status',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/status/status-dialog.html',
                    controller: 'StatusDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Status', function(Status) {
                            return Status.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('status', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('status.delete', {
            parent: 'status',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/status/status-delete-dialog.html',
                    controller: 'StatusDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Status', function(Status) {
                            return Status.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('status', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

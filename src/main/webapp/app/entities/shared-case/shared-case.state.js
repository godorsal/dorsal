(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('shared-case', {
            parent: 'entity',
            url: '/shared-case',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.sharedCase.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/shared-case/shared-cases.html',
                    controller: 'SharedCaseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('sharedCase');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('shared-case-detail', {
            parent: 'entity',
            url: '/shared-case/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.sharedCase.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/shared-case/shared-case-detail.html',
                    controller: 'SharedCaseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('sharedCase');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SharedCase', function($stateParams, SharedCase) {
                    return SharedCase.get({id : $stateParams.id});
                }]
            }
        })
        .state('shared-case.new', {
            parent: 'shared-case',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/shared-case/shared-case-dialog.html',
                    controller: 'SharedCaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('shared-case', null, { reload: true });
                }, function() {
                    $state.go('shared-case');
                });
            }]
        })
        .state('shared-case.edit', {
            parent: 'shared-case',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/shared-case/shared-case-dialog.html',
                    controller: 'SharedCaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SharedCase', function(SharedCase) {
                            return SharedCase.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('shared-case', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('shared-case.delete', {
            parent: 'shared-case',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/shared-case/shared-case-delete-dialog.html',
                    controller: 'SharedCaseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SharedCase', function(SharedCase) {
                            return SharedCase.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('shared-case', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

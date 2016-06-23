(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('referencedoc', {
            parent: 'entity',
            url: '/referencedoc',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.referencedoc.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/referencedoc/referencedocs.html',
                    controller: 'ReferencedocController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('referencedoc');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('referencedoc-detail', {
            parent: 'entity',
            url: '/referencedoc/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.referencedoc.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/referencedoc/referencedoc-detail.html',
                    controller: 'ReferencedocDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('referencedoc');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Referencedoc', function($stateParams, Referencedoc) {
                    return Referencedoc.get({id : $stateParams.id});
                }]
            }
        })
        .state('referencedoc.new', {
            parent: 'referencedoc',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/referencedoc/referencedoc-dialog.html',
                    controller: 'ReferencedocDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                url: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('referencedoc', null, { reload: true });
                }, function() {
                    $state.go('referencedoc');
                });
            }]
        })
        .state('referencedoc.edit', {
            parent: 'referencedoc',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/referencedoc/referencedoc-dialog.html',
                    controller: 'ReferencedocDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Referencedoc', function(Referencedoc) {
                            return Referencedoc.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('referencedoc', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('referencedoc.delete', {
            parent: 'referencedoc',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/referencedoc/referencedoc-delete-dialog.html',
                    controller: 'ReferencedocDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Referencedoc', function(Referencedoc) {
                            return Referencedoc.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('referencedoc', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

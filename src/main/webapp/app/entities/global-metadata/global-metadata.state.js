(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('global-metadata', {
            parent: 'entity',
            url: '/global-metadata',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.globalMetadata.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/global-metadata/global-metadata.html',
                    controller: 'GlobalMetadataController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('globalMetadata');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('global-metadata-detail', {
            parent: 'entity',
            url: '/global-metadata/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.globalMetadata.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/global-metadata/global-metadata-detail.html',
                    controller: 'GlobalMetadataDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('globalMetadata');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'GlobalMetadata', function($stateParams, GlobalMetadata) {
                    return GlobalMetadata.get({id : $stateParams.id});
                }]
            }
        })
        .state('global-metadata.new', {
            parent: 'global-metadata',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/global-metadata/global-metadata-dialog.html',
                    controller: 'GlobalMetadataDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                expertRate: null,
                                minimumCaseLength: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('global-metadata', null, { reload: true });
                }, function() {
                    $state.go('global-metadata');
                });
            }]
        })
        .state('global-metadata.edit', {
            parent: 'global-metadata',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/global-metadata/global-metadata-dialog.html',
                    controller: 'GlobalMetadataDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['GlobalMetadata', function(GlobalMetadata) {
                            return GlobalMetadata.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('global-metadata', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('global-metadata.delete', {
            parent: 'global-metadata',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/global-metadata/global-metadata-delete-dialog.html',
                    controller: 'GlobalMetadataDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['GlobalMetadata', function(GlobalMetadata) {
                            return GlobalMetadata.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('global-metadata', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

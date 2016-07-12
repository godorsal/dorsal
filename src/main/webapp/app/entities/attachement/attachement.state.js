(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('attachement', {
            parent: 'entity',
            url: '/attachement',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.attachement.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/attachement/attachements.html',
                    controller: 'AttachementController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('attachement');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('attachement-detail', {
            parent: 'entity',
            url: '/attachement/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.attachement.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/attachement/attachement-detail.html',
                    controller: 'AttachementDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('attachement');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Attachement', function($stateParams, Attachement) {
                    return Attachement.get({id : $stateParams.id});
                }]
            }
        })
        .state('attachement.new', {
            parent: 'attachement',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attachement/attachement-dialog.html',
                    controller: 'AttachementDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                url: null,
                                dataStream: null,
                                dataStreamContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('attachement', null, { reload: true });
                }, function() {
                    $state.go('attachement');
                });
            }]
        })
        .state('attachement.edit', {
            parent: 'attachement',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attachement/attachement-dialog.html',
                    controller: 'AttachementDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Attachement', function(Attachement) {
                            return Attachement.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('attachement', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('attachement.delete', {
            parent: 'attachement',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attachement/attachement-delete-dialog.html',
                    controller: 'AttachementDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Attachement', function(Attachement) {
                            return Attachement.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('attachement', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

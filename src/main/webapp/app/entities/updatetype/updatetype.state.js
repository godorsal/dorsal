(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('updatetype', {
            parent: 'entity',
            url: '/updatetype',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.updatetype.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/updatetype/updatetypes.html',
                    controller: 'UpdatetypeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('updatetype');
                    $translatePartialLoader.addPart('updateenum');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('updatetype-detail', {
            parent: 'entity',
            url: '/updatetype/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.updatetype.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/updatetype/updatetype-detail.html',
                    controller: 'UpdatetypeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('updatetype');
                    $translatePartialLoader.addPart('updateenum');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Updatetype', function($stateParams, Updatetype) {
                    return Updatetype.get({id : $stateParams.id});
                }]
            }
        })
        .state('updatetype.new', {
            parent: 'updatetype',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/updatetype/updatetype-dialog.html',
                    controller: 'UpdatetypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('updatetype', null, { reload: true });
                }, function() {
                    $state.go('updatetype');
                });
            }]
        })
        .state('updatetype.edit', {
            parent: 'updatetype',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/updatetype/updatetype-dialog.html',
                    controller: 'UpdatetypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Updatetype', function(Updatetype) {
                            return Updatetype.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('updatetype', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('updatetype.delete', {
            parent: 'updatetype',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/updatetype/updatetype-delete-dialog.html',
                    controller: 'UpdatetypeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Updatetype', function(Updatetype) {
                            return Updatetype.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('updatetype', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

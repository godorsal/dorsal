(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('groupaccess', {
            parent: 'entity',
            url: '/groupaccess',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.groupaccess.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/groupaccess/groupaccesses.html',
                    controller: 'GroupaccessController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('groupaccess');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('groupaccess-detail', {
            parent: 'entity',
            url: '/groupaccess/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.groupaccess.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/groupaccess/groupaccess-detail.html',
                    controller: 'GroupaccessDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('groupaccess');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Groupaccess', function($stateParams, Groupaccess) {
                    return Groupaccess.get({id : $stateParams.id});
                }]
            }
        })
        .state('groupaccess.new', {
            parent: 'groupaccess',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/groupaccess/groupaccess-dialog.html',
                    controller: 'GroupaccessDialogController',
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
                    $state.go('groupaccess', null, { reload: true });
                }, function() {
                    $state.go('groupaccess');
                });
            }]
        })
        .state('groupaccess.edit', {
            parent: 'groupaccess',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/groupaccess/groupaccess-dialog.html',
                    controller: 'GroupaccessDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Groupaccess', function(Groupaccess) {
                            return Groupaccess.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('groupaccess', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('groupaccess.delete', {
            parent: 'groupaccess',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/groupaccess/groupaccess-delete-dialog.html',
                    controller: 'GroupaccessDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Groupaccess', function(Groupaccess) {
                            return Groupaccess.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('groupaccess', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

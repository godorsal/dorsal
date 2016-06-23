(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('technology', {
            parent: 'entity',
            url: '/technology',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.technology.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/technology/technologies.html',
                    controller: 'TechnologyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('technology');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('technology-detail', {
            parent: 'entity',
            url: '/technology/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.technology.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/technology/technology-detail.html',
                    controller: 'TechnologyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('technology');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Technology', function($stateParams, Technology) {
                    return Technology.get({id : $stateParams.id});
                }]
            }
        })
        .state('technology.new', {
            parent: 'technology',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technology/technology-dialog.html',
                    controller: 'TechnologyDialogController',
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
                    $state.go('technology', null, { reload: true });
                }, function() {
                    $state.go('technology');
                });
            }]
        })
        .state('technology.edit', {
            parent: 'technology',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technology/technology-dialog.html',
                    controller: 'TechnologyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Technology', function(Technology) {
                            return Technology.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('technology', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('technology.delete', {
            parent: 'technology',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technology/technology-delete-dialog.html',
                    controller: 'TechnologyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Technology', function(Technology) {
                            return Technology.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('technology', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

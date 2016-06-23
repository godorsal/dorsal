(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('technologyproperty', {
            parent: 'entity',
            url: '/technologyproperty',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.technologyproperty.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/technologyproperty/technologyproperties.html',
                    controller: 'TechnologypropertyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('technologyproperty');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('technologyproperty-detail', {
            parent: 'entity',
            url: '/technologyproperty/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.technologyproperty.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/technologyproperty/technologyproperty-detail.html',
                    controller: 'TechnologypropertyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('technologyproperty');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Technologyproperty', function($stateParams, Technologyproperty) {
                    return Technologyproperty.get({id : $stateParams.id});
                }]
            }
        })
        .state('technologyproperty.new', {
            parent: 'technologyproperty',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technologyproperty/technologyproperty-dialog.html',
                    controller: 'TechnologypropertyDialogController',
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
                    $state.go('technologyproperty', null, { reload: true });
                }, function() {
                    $state.go('technologyproperty');
                });
            }]
        })
        .state('technologyproperty.edit', {
            parent: 'technologyproperty',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technologyproperty/technologyproperty-dialog.html',
                    controller: 'TechnologypropertyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Technologyproperty', function(Technologyproperty) {
                            return Technologyproperty.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('technologyproperty', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('technologyproperty.delete', {
            parent: 'technologyproperty',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technologyproperty/technologyproperty-delete-dialog.html',
                    controller: 'TechnologypropertyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Technologyproperty', function(Technologyproperty) {
                            return Technologyproperty.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('technologyproperty', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('technologypropertyvalue', {
            parent: 'entity',
            url: '/technologypropertyvalue',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.technologypropertyvalue.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/technologypropertyvalue/technologypropertyvalues.html',
                    controller: 'TechnologypropertyvalueController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('technologypropertyvalue');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('technologypropertyvalue-detail', {
            parent: 'entity',
            url: '/technologypropertyvalue/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.technologypropertyvalue.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/technologypropertyvalue/technologypropertyvalue-detail.html',
                    controller: 'TechnologypropertyvalueDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('technologypropertyvalue');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Technologypropertyvalue', function($stateParams, Technologypropertyvalue) {
                    return Technologypropertyvalue.get({id : $stateParams.id});
                }]
            }
        })
        .state('technologypropertyvalue.new', {
            parent: 'technologypropertyvalue',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technologypropertyvalue/technologypropertyvalue-dialog.html',
                    controller: 'TechnologypropertyvalueDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                value: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('technologypropertyvalue', null, { reload: true });
                }, function() {
                    $state.go('technologypropertyvalue');
                });
            }]
        })
        .state('technologypropertyvalue.edit', {
            parent: 'technologypropertyvalue',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technologypropertyvalue/technologypropertyvalue-dialog.html',
                    controller: 'TechnologypropertyvalueDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Technologypropertyvalue', function(Technologypropertyvalue) {
                            return Technologypropertyvalue.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('technologypropertyvalue', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('technologypropertyvalue.delete', {
            parent: 'technologypropertyvalue',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technologypropertyvalue/technologypropertyvalue-delete-dialog.html',
                    controller: 'TechnologypropertyvalueDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Technologypropertyvalue', function(Technologypropertyvalue) {
                            return Technologypropertyvalue.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('technologypropertyvalue', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

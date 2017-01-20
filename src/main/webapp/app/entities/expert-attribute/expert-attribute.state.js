(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('expert-attribute', {
            parent: 'entity',
            url: '/expert-attribute',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertAttribute.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-attribute/expert-attributes.html',
                    controller: 'ExpertAttributeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertAttribute');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('expert-attribute-detail', {
            parent: 'entity',
            url: '/expert-attribute/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertAttribute.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-attribute/expert-attribute-detail.html',
                    controller: 'ExpertAttributeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertAttribute');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ExpertAttribute', function($stateParams, ExpertAttribute) {
                    return ExpertAttribute.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'expert-attribute',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('expert-attribute-detail.edit', {
            parent: 'expert-attribute-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-attribute/expert-attribute-dialog.html',
                    controller: 'ExpertAttributeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertAttribute', function(ExpertAttribute) {
                            return ExpertAttribute.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-attribute.new', {
            parent: 'expert-attribute',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-attribute/expert-attribute-dialog.html',
                    controller: 'ExpertAttributeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('expert-attribute', null, { reload: 'expert-attribute' });
                }, function() {
                    $state.go('expert-attribute');
                });
            }]
        })
        .state('expert-attribute.edit', {
            parent: 'expert-attribute',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-attribute/expert-attribute-dialog.html',
                    controller: 'ExpertAttributeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertAttribute', function(ExpertAttribute) {
                            return ExpertAttribute.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-attribute', null, { reload: 'expert-attribute' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-attribute.delete', {
            parent: 'expert-attribute',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-attribute/expert-attribute-delete-dialog.html',
                    controller: 'ExpertAttributeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ExpertAttribute', function(ExpertAttribute) {
                            return ExpertAttribute.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-attribute', null, { reload: 'expert-attribute' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

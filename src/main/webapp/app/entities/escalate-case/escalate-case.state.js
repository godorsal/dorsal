(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('escalate-case', {
            parent: 'entity',
            url: '/escalate-case',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.escalateCase.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/escalate-case/escalate-cases.html',
                    controller: 'EscalateCaseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('escalateCase');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('escalate-case-detail', {
            parent: 'entity',
            url: '/escalate-case/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.escalateCase.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/escalate-case/escalate-case-detail.html',
                    controller: 'EscalateCaseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('escalateCase');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EscalateCase', function($stateParams, EscalateCase) {
                    return EscalateCase.get({id : $stateParams.id});
                }]
            }
        })
        .state('escalate-case.new', {
            parent: 'escalate-case',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/escalate-case/escalate-case-dialog.html',
                    controller: 'EscalateCaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                reason: null,
                                dateEscalated: null,
                                escalationType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('escalate-case', null, { reload: true });
                }, function() {
                    $state.go('escalate-case');
                });
            }]
        })
        .state('escalate-case.edit', {
            parent: 'escalate-case',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/escalate-case/escalate-case-dialog.html',
                    controller: 'EscalateCaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EscalateCase', function(EscalateCase) {
                            return EscalateCase.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('escalate-case', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('escalate-case.delete', {
            parent: 'escalate-case',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/escalate-case/escalate-case-delete-dialog.html',
                    controller: 'EscalateCaseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EscalateCase', function(EscalateCase) {
                            return EscalateCase.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('escalate-case', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

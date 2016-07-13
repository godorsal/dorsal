(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('supportcase', {
            parent: 'entity',
            url: '/supportcase',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.supportcase.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/supportcase/supportcases.html',
                    controller: 'SupportcaseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('supportcase');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('supportcase-detail', {
            parent: 'entity',
            url: '/supportcase/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.supportcase.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/supportcase/supportcase-detail.html',
                    controller: 'SupportcaseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('supportcase');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Supportcase', function($stateParams, Supportcase) {
                    return Supportcase.get({id : $stateParams.id});
                }]
            }
        })
        .state('supportcase.new', {
            parent: 'supportcase',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/supportcase/supportcase-dialog.html',
                    controller: 'SupportcaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                summary: null,
                                expectedResult: null,
                                statusMsg: null,
                                dateCreated: null,
                                dateLastUpdate: null,
                                chatUrl: null,
                                etaCompletion: null,
                                estimateHours: null,
                                estimateComment: null,
                                isApproved: null,
                                timeOnCase: null,
                                estimateLog: null,
                                isResolved: null,
                                isRated: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('supportcase', null, { reload: true });
                }, function() {
                    $state.go('supportcase');
                });
            }]
        })
        .state('supportcase.edit', {
            parent: 'supportcase',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/supportcase/supportcase-dialog.html',
                    controller: 'SupportcaseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Supportcase', function(Supportcase) {
                            return Supportcase.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('supportcase', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('supportcase.delete', {
            parent: 'supportcase',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/supportcase/supportcase-delete-dialog.html',
                    controller: 'SupportcaseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Supportcase', function(Supportcase) {
                            return Supportcase.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('supportcase', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

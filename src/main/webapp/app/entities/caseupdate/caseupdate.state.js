(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('caseupdate', {
            parent: 'entity',
            url: '/caseupdate',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.caseupdate.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/caseupdate/caseupdates.html',
                    controller: 'CaseupdateController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('caseupdate');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('caseupdate-detail', {
            parent: 'entity',
            url: '/caseupdate/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.caseupdate.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/caseupdate/caseupdate-detail.html',
                    controller: 'CaseupdateDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('caseupdate');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Caseupdate', function($stateParams, Caseupdate) {
                    return Caseupdate.get({id : $stateParams.id});
                }]
            }
        })
        .state('caseupdate.new', {
            parent: 'caseupdate',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/caseupdate/caseupdate-dialog.html',
                    controller: 'CaseupdateDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                dateUpdated: null,
                                updateMsg: null,
                                url: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('caseupdate', null, { reload: true });
                }, function() {
                    $state.go('caseupdate');
                });
            }]
        })
        .state('caseupdate.edit', {
            parent: 'caseupdate',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/caseupdate/caseupdate-dialog.html',
                    controller: 'CaseupdateDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Caseupdate', function(Caseupdate) {
                            return Caseupdate.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('caseupdate', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('caseupdate.delete', {
            parent: 'caseupdate',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/caseupdate/caseupdate-delete-dialog.html',
                    controller: 'CaseupdateDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Caseupdate', function(Caseupdate) {
                            return Caseupdate.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('caseupdate', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

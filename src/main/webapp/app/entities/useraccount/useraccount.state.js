(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('useraccount', {
            parent: 'entity',
            url: '/useraccount',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.useraccount.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/useraccount/useraccounts.html',
                    controller: 'UseraccountController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('useraccount');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('useraccount-detail', {
            parent: 'entity',
            url: '/useraccount/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.useraccount.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/useraccount/useraccount-detail.html',
                    controller: 'UseraccountDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('useraccount');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Useraccount', function($stateParams, Useraccount) {
                    return Useraccount.get({id : $stateParams.id});
                }]
            }
        })
        .state('useraccount.new', {
            parent: 'useraccount',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/useraccount/useraccount-dialog.html',
                    controller: 'UseraccountDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                phone: null,
                                skype: null,
                                othercommunication: null,
                                location: null,
                                score: null,
                                isexpert: null,
                                preferlocalexpert: null,
                                handle: null,
                                languages: null,
                                companyname: null,
                                technologypreference: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('useraccount', null, { reload: true });
                }, function() {
                    $state.go('useraccount');
                });
            }]
        })
        .state('useraccount.edit', {
            parent: 'useraccount',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/useraccount/useraccount-dialog.html',
                    controller: 'UseraccountDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Useraccount', function(Useraccount) {
                            return Useraccount.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('useraccount', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('useraccount.delete', {
            parent: 'useraccount',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/useraccount/useraccount-delete-dialog.html',
                    controller: 'UseraccountDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Useraccount', function(Useraccount) {
                            return Useraccount.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('useraccount', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

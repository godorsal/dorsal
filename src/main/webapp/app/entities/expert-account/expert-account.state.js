(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('expert-account', {
            parent: 'entity',
            url: '/expert-account',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertAccount.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-account/expert-accounts.html',
                    controller: 'ExpertAccountController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertAccount');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('expert-account-detail', {
            parent: 'entity',
            url: '/expert-account/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertAccount.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-account/expert-account-detail.html',
                    controller: 'ExpertAccountDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertAccount');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ExpertAccount', function($stateParams, ExpertAccount) {
                    return ExpertAccount.get({id : $stateParams.id});
                }]
            }
        })
        .state('expert-account.new', {
            parent: 'expert-account',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-account/expert-account-dialog.html',
                    controller: 'ExpertAccountDialogController',
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
                                expertScore: null,
                                handle: null,
                                languages: null,
                                imagePath: null,
                                firstTechnologyPreference: null,
                                secondTechnologyPreference: null,
                                thirdTechnologyPreference: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('expert-account', null, { reload: true });
                }, function() {
                    $state.go('expert-account');
                });
            }]
        })
        .state('expert-account.edit', {
            parent: 'expert-account',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-account/expert-account-dialog.html',
                    controller: 'ExpertAccountDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertAccount', function(ExpertAccount) {
                            return ExpertAccount.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-account', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-account.delete', {
            parent: 'expert-account',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-account/expert-account-delete-dialog.html',
                    controller: 'ExpertAccountDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ExpertAccount', function(ExpertAccount) {
                            return ExpertAccount.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-account', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

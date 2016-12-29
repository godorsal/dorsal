(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('expert-pool-to-expert', {
            parent: 'entity',
            url: '/expert-pool-to-expert',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertPoolToExpert.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-pool-to-expert/expert-pool-to-experts.html',
                    controller: 'ExpertPoolToExpertController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertPoolToExpert');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('expert-pool-to-expert-detail', {
            parent: 'entity',
            url: '/expert-pool-to-expert/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertPoolToExpert.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-pool-to-expert/expert-pool-to-expert-detail.html',
                    controller: 'ExpertPoolToExpertDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertPoolToExpert');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ExpertPoolToExpert', function($stateParams, ExpertPoolToExpert) {
                    return ExpertPoolToExpert.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'expert-pool-to-expert',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('expert-pool-to-expert-detail.edit', {
            parent: 'expert-pool-to-expert-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-pool-to-expert/expert-pool-to-expert-dialog.html',
                    controller: 'ExpertPoolToExpertDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertPoolToExpert', function(ExpertPoolToExpert) {
                            return ExpertPoolToExpert.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-pool-to-expert.new', {
            parent: 'expert-pool-to-expert',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-pool-to-expert/expert-pool-to-expert-dialog.html',
                    controller: 'ExpertPoolToExpertDialogController',
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
                    $state.go('expert-pool-to-expert', null, { reload: 'expert-pool-to-expert' });
                }, function() {
                    $state.go('expert-pool-to-expert');
                });
            }]
        })
        .state('expert-pool-to-expert.edit', {
            parent: 'expert-pool-to-expert',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-pool-to-expert/expert-pool-to-expert-dialog.html',
                    controller: 'ExpertPoolToExpertDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertPoolToExpert', function(ExpertPoolToExpert) {
                            return ExpertPoolToExpert.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-pool-to-expert', null, { reload: 'expert-pool-to-expert' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-pool-to-expert.delete', {
            parent: 'expert-pool-to-expert',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-pool-to-expert/expert-pool-to-expert-delete-dialog.html',
                    controller: 'ExpertPoolToExpertDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ExpertPoolToExpert', function(ExpertPoolToExpert) {
                            return ExpertPoolToExpert.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-pool-to-expert', null, { reload: 'expert-pool-to-expert' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

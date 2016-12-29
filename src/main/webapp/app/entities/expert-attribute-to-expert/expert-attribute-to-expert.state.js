(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('expert-attribute-to-expert', {
            parent: 'entity',
            url: '/expert-attribute-to-expert',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertAttributeToExpert.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-attribute-to-expert/expert-attribute-to-experts.html',
                    controller: 'ExpertAttributeToExpertController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertAttributeToExpert');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('expert-attribute-to-expert-detail', {
            parent: 'entity',
            url: '/expert-attribute-to-expert/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.expertAttributeToExpert.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/expert-attribute-to-expert/expert-attribute-to-expert-detail.html',
                    controller: 'ExpertAttributeToExpertDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('expertAttributeToExpert');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ExpertAttributeToExpert', function($stateParams, ExpertAttributeToExpert) {
                    return ExpertAttributeToExpert.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'expert-attribute-to-expert',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('expert-attribute-to-expert-detail.edit', {
            parent: 'expert-attribute-to-expert-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-attribute-to-expert/expert-attribute-to-expert-dialog.html',
                    controller: 'ExpertAttributeToExpertDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertAttributeToExpert', function(ExpertAttributeToExpert) {
                            return ExpertAttributeToExpert.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-attribute-to-expert.new', {
            parent: 'expert-attribute-to-expert',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-attribute-to-expert/expert-attribute-to-expert-dialog.html',
                    controller: 'ExpertAttributeToExpertDialogController',
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
                    $state.go('expert-attribute-to-expert', null, { reload: 'expert-attribute-to-expert' });
                }, function() {
                    $state.go('expert-attribute-to-expert');
                });
            }]
        })
        .state('expert-attribute-to-expert.edit', {
            parent: 'expert-attribute-to-expert',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-attribute-to-expert/expert-attribute-to-expert-dialog.html',
                    controller: 'ExpertAttributeToExpertDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ExpertAttributeToExpert', function(ExpertAttributeToExpert) {
                            return ExpertAttributeToExpert.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-attribute-to-expert', null, { reload: 'expert-attribute-to-expert' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('expert-attribute-to-expert.delete', {
            parent: 'expert-attribute-to-expert',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/expert-attribute-to-expert/expert-attribute-to-expert-delete-dialog.html',
                    controller: 'ExpertAttributeToExpertDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ExpertAttributeToExpert', function(ExpertAttributeToExpert) {
                            return ExpertAttributeToExpert.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('expert-attribute-to-expert', null, { reload: 'expert-attribute-to-expert' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

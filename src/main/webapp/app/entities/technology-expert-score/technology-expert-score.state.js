(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('technology-expert-score', {
            parent: 'entity',
            url: '/technology-expert-score',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.technologyExpertScore.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/technology-expert-score/technology-expert-scores.html',
                    controller: 'TechnologyExpertScoreController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('technologyExpertScore');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('technology-expert-score-detail', {
            parent: 'entity',
            url: '/technology-expert-score/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.technologyExpertScore.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/technology-expert-score/technology-expert-score-detail.html',
                    controller: 'TechnologyExpertScoreDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('technologyExpertScore');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TechnologyExpertScore', function($stateParams, TechnologyExpertScore) {
                    return TechnologyExpertScore.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'technology-expert-score',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('technology-expert-score-detail.edit', {
            parent: 'technology-expert-score-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technology-expert-score/technology-expert-score-dialog.html',
                    controller: 'TechnologyExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TechnologyExpertScore', function(TechnologyExpertScore) {
                            return TechnologyExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('technology-expert-score.new', {
            parent: 'technology-expert-score',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technology-expert-score/technology-expert-score-dialog.html',
                    controller: 'TechnologyExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                score: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('technology-expert-score', null, { reload: 'technology-expert-score' });
                }, function() {
                    $state.go('technology-expert-score');
                });
            }]
        })
        .state('technology-expert-score.edit', {
            parent: 'technology-expert-score',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technology-expert-score/technology-expert-score-dialog.html',
                    controller: 'TechnologyExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TechnologyExpertScore', function(TechnologyExpertScore) {
                            return TechnologyExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('technology-expert-score', null, { reload: 'technology-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('technology-expert-score.delete', {
            parent: 'technology-expert-score',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/technology-expert-score/technology-expert-score-delete-dialog.html',
                    controller: 'TechnologyExpertScoreDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TechnologyExpertScore', function(TechnologyExpertScore) {
                            return TechnologyExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('technology-expert-score', null, { reload: 'technology-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

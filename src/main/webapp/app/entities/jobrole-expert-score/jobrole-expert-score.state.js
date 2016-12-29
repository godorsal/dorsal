(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('jobrole-expert-score', {
            parent: 'entity',
            url: '/jobrole-expert-score',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.jobroleExpertScore.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/jobrole-expert-score/jobrole-expert-scores.html',
                    controller: 'JobroleExpertScoreController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('jobroleExpertScore');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('jobrole-expert-score-detail', {
            parent: 'entity',
            url: '/jobrole-expert-score/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.jobroleExpertScore.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/jobrole-expert-score/jobrole-expert-score-detail.html',
                    controller: 'JobroleExpertScoreDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('jobroleExpertScore');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'JobroleExpertScore', function($stateParams, JobroleExpertScore) {
                    return JobroleExpertScore.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'jobrole-expert-score',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('jobrole-expert-score-detail.edit', {
            parent: 'jobrole-expert-score-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/jobrole-expert-score/jobrole-expert-score-dialog.html',
                    controller: 'JobroleExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobroleExpertScore', function(JobroleExpertScore) {
                            return JobroleExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('jobrole-expert-score.new', {
            parent: 'jobrole-expert-score',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/jobrole-expert-score/jobrole-expert-score-dialog.html',
                    controller: 'JobroleExpertScoreDialogController',
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
                    $state.go('jobrole-expert-score', null, { reload: 'jobrole-expert-score' });
                }, function() {
                    $state.go('jobrole-expert-score');
                });
            }]
        })
        .state('jobrole-expert-score.edit', {
            parent: 'jobrole-expert-score',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/jobrole-expert-score/jobrole-expert-score-dialog.html',
                    controller: 'JobroleExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobroleExpertScore', function(JobroleExpertScore) {
                            return JobroleExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('jobrole-expert-score', null, { reload: 'jobrole-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('jobrole-expert-score.delete', {
            parent: 'jobrole-expert-score',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/jobrole-expert-score/jobrole-expert-score-delete-dialog.html',
                    controller: 'JobroleExpertScoreDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['JobroleExpertScore', function(JobroleExpertScore) {
                            return JobroleExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('jobrole-expert-score', null, { reload: 'jobrole-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

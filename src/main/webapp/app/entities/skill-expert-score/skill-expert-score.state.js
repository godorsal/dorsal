(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('skill-expert-score', {
            parent: 'entity',
            url: '/skill-expert-score',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.skillExpertScore.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/skill-expert-score/skill-expert-scores.html',
                    controller: 'SkillExpertScoreController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('skillExpertScore');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('skill-expert-score-detail', {
            parent: 'entity',
            url: '/skill-expert-score/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.skillExpertScore.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/skill-expert-score/skill-expert-score-detail.html',
                    controller: 'SkillExpertScoreDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('skillExpertScore');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SkillExpertScore', function($stateParams, SkillExpertScore) {
                    return SkillExpertScore.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'skill-expert-score',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('skill-expert-score-detail.edit', {
            parent: 'skill-expert-score-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/skill-expert-score/skill-expert-score-dialog.html',
                    controller: 'SkillExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SkillExpertScore', function(SkillExpertScore) {
                            return SkillExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('skill-expert-score.new', {
            parent: 'skill-expert-score',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/skill-expert-score/skill-expert-score-dialog.html',
                    controller: 'SkillExpertScoreDialogController',
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
                    $state.go('skill-expert-score', null, { reload: 'skill-expert-score' });
                }, function() {
                    $state.go('skill-expert-score');
                });
            }]
        })
        .state('skill-expert-score.edit', {
            parent: 'skill-expert-score',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/skill-expert-score/skill-expert-score-dialog.html',
                    controller: 'SkillExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SkillExpertScore', function(SkillExpertScore) {
                            return SkillExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('skill-expert-score', null, { reload: 'skill-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('skill-expert-score.delete', {
            parent: 'skill-expert-score',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/skill-expert-score/skill-expert-score-delete-dialog.html',
                    controller: 'SkillExpertScoreDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SkillExpertScore', function(SkillExpertScore) {
                            return SkillExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('skill-expert-score', null, { reload: 'skill-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

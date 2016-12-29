(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('speciality-expert-score', {
            parent: 'entity',
            url: '/speciality-expert-score',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.specialityExpertScore.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/speciality-expert-score/speciality-expert-scores.html',
                    controller: 'SpecialityExpertScoreController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('specialityExpertScore');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('speciality-expert-score-detail', {
            parent: 'entity',
            url: '/speciality-expert-score/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.specialityExpertScore.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/speciality-expert-score/speciality-expert-score-detail.html',
                    controller: 'SpecialityExpertScoreDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('specialityExpertScore');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SpecialityExpertScore', function($stateParams, SpecialityExpertScore) {
                    return SpecialityExpertScore.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'speciality-expert-score',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('speciality-expert-score-detail.edit', {
            parent: 'speciality-expert-score-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/speciality-expert-score/speciality-expert-score-dialog.html',
                    controller: 'SpecialityExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SpecialityExpertScore', function(SpecialityExpertScore) {
                            return SpecialityExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('speciality-expert-score.new', {
            parent: 'speciality-expert-score',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/speciality-expert-score/speciality-expert-score-dialog.html',
                    controller: 'SpecialityExpertScoreDialogController',
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
                    $state.go('speciality-expert-score', null, { reload: 'speciality-expert-score' });
                }, function() {
                    $state.go('speciality-expert-score');
                });
            }]
        })
        .state('speciality-expert-score.edit', {
            parent: 'speciality-expert-score',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/speciality-expert-score/speciality-expert-score-dialog.html',
                    controller: 'SpecialityExpertScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SpecialityExpertScore', function(SpecialityExpertScore) {
                            return SpecialityExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('speciality-expert-score', null, { reload: 'speciality-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('speciality-expert-score.delete', {
            parent: 'speciality-expert-score',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/speciality-expert-score/speciality-expert-score-delete-dialog.html',
                    controller: 'SpecialityExpertScoreDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SpecialityExpertScore', function(SpecialityExpertScore) {
                            return SpecialityExpertScore.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('speciality-expert-score', null, { reload: 'speciality-expert-score' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

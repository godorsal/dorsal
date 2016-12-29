(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('job-role', {
            parent: 'entity',
            url: '/job-role',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.jobRole.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job-role/job-roles.html',
                    controller: 'JobRoleController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('jobRole');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('job-role-detail', {
            parent: 'entity',
            url: '/job-role/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.jobRole.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/job-role/job-role-detail.html',
                    controller: 'JobRoleDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('jobRole');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'JobRole', function($stateParams, JobRole) {
                    return JobRole.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'job-role',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('job-role-detail.edit', {
            parent: 'job-role-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-role/job-role-dialog.html',
                    controller: 'JobRoleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobRole', function(JobRole) {
                            return JobRole.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-role.new', {
            parent: 'job-role',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-role/job-role-dialog.html',
                    controller: 'JobRoleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                code: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('job-role', null, { reload: 'job-role' });
                }, function() {
                    $state.go('job-role');
                });
            }]
        })
        .state('job-role.edit', {
            parent: 'job-role',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-role/job-role-dialog.html',
                    controller: 'JobRoleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['JobRole', function(JobRole) {
                            return JobRole.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-role', null, { reload: 'job-role' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('job-role.delete', {
            parent: 'job-role',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/job-role/job-role-delete-dialog.html',
                    controller: 'JobRoleDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['JobRole', function(JobRole) {
                            return JobRole.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('job-role', null, { reload: 'job-role' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

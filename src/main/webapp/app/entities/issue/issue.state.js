(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('issue', {
            parent: 'entity',
            url: '/issue',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.issue.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/issue/issues.html',
                    controller: 'IssueController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('issue');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('issue-detail', {
            parent: 'entity',
            url: '/issue/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.issue.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/issue/issue-detail.html',
                    controller: 'IssueDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('issue');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Issue', function($stateParams, Issue) {
                    return Issue.get({id : $stateParams.id});
                }]
            }
        })
        .state('issue.new', {
            parent: 'issue',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/issue/issue-dialog.html',
                    controller: 'IssueDialogController',
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
                    $state.go('issue', null, { reload: true });
                }, function() {
                    $state.go('issue');
                });
            }]
        })
        .state('issue.edit', {
            parent: 'issue',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/issue/issue-dialog.html',
                    controller: 'IssueDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Issue', function(Issue) {
                            return Issue.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('issue', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('issue.delete', {
            parent: 'issue',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/issue/issue-delete-dialog.html',
                    controller: 'IssueDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Issue', function(Issue) {
                            return Issue.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('issue', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

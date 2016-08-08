(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('support-case-report', {
            parent: 'entity',
            url: '/support-case-report',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.supportCaseReport.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/support-case-report/support-case-reports.html',
                    controller: 'SupportCaseReportController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('supportCaseReport');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('support-case-report-detail', {
            parent: 'entity',
            url: '/support-case-report/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.supportCaseReport.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/support-case-report/support-case-report-detail.html',
                    controller: 'SupportCaseReportDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('supportCaseReport');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'SupportCaseReport', function($stateParams, SupportCaseReport) {
                    return SupportCaseReport.get({id : $stateParams.id});
                }]
            }
        })
        .state('support-case-report.new', {
            parent: 'support-case-report',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/support-case-report/support-case-report-dialog.html',
                    controller: 'SupportCaseReportDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                isPaid: null,
                                datePaid: null,
                                comments: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('support-case-report', null, { reload: true });
                }, function() {
                    $state.go('support-case-report');
                });
            }]
        })
        .state('support-case-report.edit', {
            parent: 'support-case-report',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/support-case-report/support-case-report-dialog.html',
                    controller: 'SupportCaseReportDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['SupportCaseReport', function(SupportCaseReport) {
                            return SupportCaseReport.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('support-case-report', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('support-case-report.delete', {
            parent: 'support-case-report',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/support-case-report/support-case-report-delete-dialog.html',
                    controller: 'SupportCaseReportDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['SupportCaseReport', function(SupportCaseReport) {
                            return SupportCaseReport.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('support-case-report', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

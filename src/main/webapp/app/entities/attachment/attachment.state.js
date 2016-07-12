(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('attachment', {
            parent: 'entity',
            url: '/attachment',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.attachment.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/attachment/attachments.html',
                    controller: 'AttachmentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('attachment');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('attachment-detail', {
            parent: 'entity',
            url: '/attachment/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.attachment.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/attachment/attachment-detail.html',
                    controller: 'AttachmentDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('attachment');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Attachment', function($stateParams, Attachment) {
                    return Attachment.get({id : $stateParams.id});
                }]
            }
        })
        .state('attachment.new', {
            parent: 'attachment',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attachment/attachment-dialog.html',
                    controller: 'AttachmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                url: null,
                                dataStream: null,
                                dataStreamContentType: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('attachment', null, { reload: true });
                }, function() {
                    $state.go('attachment');
                });
            }]
        })
        .state('attachment.edit', {
            parent: 'attachment',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attachment/attachment-dialog.html',
                    controller: 'AttachmentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Attachment', function(Attachment) {
                            return Attachment.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('attachment', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('attachment.delete', {
            parent: 'attachment',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/attachment/attachment-delete-dialog.html',
                    controller: 'AttachmentDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Attachment', function(Attachment) {
                            return Attachment.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('attachment', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

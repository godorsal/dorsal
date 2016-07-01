(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('casetechnologyproperty', {
            parent: 'entity',
            url: '/casetechnologyproperty',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.casetechnologyproperty.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/casetechnologyproperty/casetechnologyproperties.html',
                    controller: 'CasetechnologypropertyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('casetechnologyproperty');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('casetechnologyproperty-detail', {
            parent: 'entity',
            url: '/casetechnologyproperty/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dorsalApp.casetechnologyproperty.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/casetechnologyproperty/casetechnologyproperty-detail.html',
                    controller: 'CasetechnologypropertyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('casetechnologyproperty');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Casetechnologyproperty', function($stateParams, Casetechnologyproperty) {
                    return Casetechnologyproperty.get({technology : $stateParams.id});
                }]
            }
        })
        .state('casetechnologyproperty.new', {
            parent: 'casetechnologyproperty',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/casetechnologyproperty/casetechnologyproperty-dialog.html',
                    controller: 'CasetechnologypropertyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                propertyname: null,
                                propertyvalue: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('casetechnologyproperty', null, { reload: true });
                }, function() {
                    $state.go('casetechnologyproperty');
                });
            }]
        })
        .state('casetechnologyproperty.edit', {
            parent: 'casetechnologyproperty',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/casetechnologyproperty/casetechnologyproperty-dialog.html',
                    controller: 'CasetechnologypropertyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Casetechnologyproperty', function(Casetechnologyproperty) {
                            return Casetechnologyproperty.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('casetechnologyproperty', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('casetechnologyproperty.delete', {
            parent: 'casetechnologyproperty',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/casetechnologyproperty/casetechnologyproperty-delete-dialog.html',
                    controller: 'CasetechnologypropertyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Casetechnologyproperty', function(Casetechnologyproperty) {
                            return Casetechnologyproperty.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('casetechnologyproperty', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

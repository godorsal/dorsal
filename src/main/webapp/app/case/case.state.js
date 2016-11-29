(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$httpProvider'];

    function stateConfig($stateProvider, $httpProvider) {
        $stateProvider.state('case', {
            parent: 'app',
            url: '/case',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/case/case.html',
                    controller: 'CaseController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sharedPage: {
                    value: '1',
                    squash: true
                },
                currentCaseIndex: {
                    value: {
                        index: 0,
                        type: 'supportCase'
                    },
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                }
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sharedPage: PaginationUtil.parsePage($stateParams.sharedPage),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        currentCaseIndex: $stateParams.currentCaseIndex
                    };
                }],
                TranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                    $translatePartialLoader.addPart('adminSupportCaseReport');
                    $translatePartialLoader.addPart('case');
                    return $translate.refresh();
                }]
            }
        });
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
})();

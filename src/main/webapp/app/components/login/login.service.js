(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$uibModal'];

    function LoginService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };
        var options = {
            keyboard: true,
            animation: true,
            templateUrl: 'app/components/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('login');
                    return $translate.refresh();
                }]
            }
        }

        return service;

        function open () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open(options);
            // keyboard: true,
            // animation: true,
            // templateUrl: 'app/components/login/login.html',
            // controller: 'LoginController',
            // controllerAs: 'vm',
            // resolve: {
            //     translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
            //         $translatePartialLoader.addPart('login');
            //         return $translate.refresh();
            //     }]
            // }
            console.log(modalInstance);
            modalInstance.result.then(
                resetModal,
                resetModal
            );
        }
    }
})();

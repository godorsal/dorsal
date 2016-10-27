(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'DrslMetadata', 'DrslUserFlowService', '$document'];

    function LoginController ($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, DrslMetadata, DrslUserFlowService, $document) {
        var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.togglePath = togglePath;
        vm.password = null;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;
        vm.username = null;
        vm.altPathSignInText = "sign in";
        vm.altPathRegisterText = "create an account";
        vm.altPathText = vm.altPathRegisterText;
        vm.isLogin = true;
        vm.DrslMetadata = DrslMetadata;

        // Register Properties
        vm.register = register;
        vm.doNotMatch = null;
        vm.error = null;
        vm.errorUserExists = null;
        vm.registerAccount = {};
        vm.success = null;

        $timeout(function (){angular.element('#username').focus();});

        $document.keyup(function(e) {
             if (e.keyCode == 27) {
                 cancel ()
            }
        });

        function cancel () {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
            $uibModalInstance.dismiss('cancel');
        }

        function login (event) {
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                vm.authenticationError = false;
                $uibModalInstance.close();
                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                    $state.go('home');
                }

                $rootScope.$broadcast('authenticationSuccess');
                DrslUserFlowService.handleUserFlow('login');
            }).catch(function () {
                vm.authenticationError = true;
            });
        }

        function register (event) {
            event.preventDefault();

            if (vm.registerAccount.password !== vm.confirmPassword) {
                vm.doNotMatch = 'ERROR';
            } else {
                vm.registerAccount.langKey = $translate.use();
                vm.doNotMatch = null;
                vm.error = null;
                vm.errorUserExists = null;
                vm.errorEmailExists = null;
                Auth.createAccount(vm.registerAccount).then(function () {
                    vm.success = 'OK';
                }).catch(function (response) {
                    vm.success = null;
                    if (response.status === 400 && response.data === 'login already in use') {
                        vm.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                        vm.errorEmailExists = 'ERROR';
                    } else {
                        vm.error = 'ERROR';
                    }
                });
            }
        }

        function requestResetPassword () {
            $uibModalInstance.dismiss('cancel');
            $state.go('requestReset');
        }

        function togglePath(e) {
            e.preventDefault();

            vm.isLogin = !vm.isLogin;

            if (vm.isLogin) {
                vm.altPathText = vm.altPathRegisterText;
                vm.username = vm.registerAccount.login;
            } else {
                vm.altPathText = vm.altPathSignInText;
                vm.registerAccount.login = vm.username;
            }
        }
    }
})();

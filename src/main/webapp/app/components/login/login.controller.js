(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'DrslMetadata', 'DrslUserFlowService', '$document', 'PasswordValidationService', 'Focus', 'User', 'Payment'];

    function LoginController ($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, DrslMetadata, DrslUserFlowService, $document, PasswordValidationService, Focus, User, Payment) {
        var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.login = login;
        vm.togglePath = togglePath;
        vm.password = null;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;
        vm.checkPassword = checkPassword;
        vm.checkConfirmPassword = checkConfirmPassword;
        vm.username = null;
        vm.altPathSignInText = "sign in";
        vm.altPathRegisterText = "create an account";
        vm.altPathText = vm.altPathRegisterText;
        vm.isLogin = true;
        vm.DrslMetadata = DrslMetadata;
        vm.checkPassword = checkPassword;
        vm.passwordErrors = [];
        // Register Properties
        vm.register = register;
        vm.doNotMatch = null;
        vm.error = null;
        vm.errorUserExists = null;
        vm.registerAccount = {};
        vm.success = null;
        vm.passwordValidity = [];

        vm.addCard = addCard;
        vm.creditCard = null;
        vm.numberTab = numberTab;
        vm.getUserByLoginTest = getUserByLoginTest;


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
        function checkPassword() {
            vm.passwordErrors = [];
            // if(vm.registerAccount.password.length < 8){
            //     vm.passwordErrors.push("Too Short")
            // }
            if(!vm.registerAccount.password.match(/[a-z]/g)){
                vm.passwordErrors.push("Needs Lowercase")
            }
            if(!vm.registerAccount.password.match(/[A-Z]/g)){
                vm.passwordErrors.push("Needs Uppercase")
            }
            if(!vm.registerAccount.password.match(/[0-9]/g)){
                vm.passwordErrors.push("Needs Number")
            }
            if(!vm.registerAccount.password.match(/;|"|!|\+|#|\$|%|\^|&|\*|\)|\(|:|\?|\/|<|>|{|}|\[|\]|-|_|=|\~|\`|\||\\|\/|\s/g)){
                vm.passwordErrors.push("Needs Special Symbol")
            }
            if((/([a-z])\1/i).test(vm.registerAccount.password)){
                vm.passwordErrors.push("Has Repeating Characters")
            }
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
        function getUserByLoginTest() {
            User.get({login: "g"
            }, function (res) {
                console.log("GOOD", res);
            }, function (res) {
                console.log("BAD", res);
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
                Auth.createAccount(vm.registerAccount).then(function (response) {
                    vm.success = 'OK';
                    console.log("RESPONSE FROM REGISTRATION", response);
                    User.get({login: response.login
                    }, function (res) {
                        addCard(res);


                    }, function (res) {
                        console.log("BAD", res);
                    });
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
        function checkPassword(form) {
            PasswordValidationService.checkPassword(form);
        }
        function checkConfirmPassword(form) {
            PasswordValidationService.checkConfirmPassword(form);
        }
        function requestResetPassword () {
            $uibModalInstance.dismiss('cancel');
            $state.go('requestReset');
        }
        //
        //  Credit Card Input
        //

        /**
        * Shifts focus to the next CC field as data is entered.
        * @param event
        */
        function numberTab(event) {
            if (event.target.value.length === event.target.maxLength) {
                var currentNumber = event.target.id.match(/\d+/);
                if (currentNumber && currentNumber[0] < 4) {
                    var newNumber = parseInt(currentNumber[0]) + 1;
                    angular.element('#ccNumber' + newNumber).focus();
                    // focus('ccNumber' + newNumber);
                }
                event.preventDefault();
            }
        }

        /**
        * Updates or saves the credit card data.
        */
        function addCard(user) {
            // Get the cc number
            vm.number = Object.keys(vm.creditCard.number).map(function (k) {
                return vm.creditCard.number[k]
            });

            // Display an error if their's an issue with the cc num or cvv
            if (vm.number.join('').length != 16 || vm.creditCard.cvv.toString().length != 3) {
                toastr["error"]("Saving Error");
                return;
            }

            // Create a temp cc object
            vm.tempCard = {
                name: vm.creditCard.name,
                number: vm.number.join(''),
                month: vm.creditCard.month,
                year: vm.creditCard.year,
                cvv: vm.creditCard.cvv,
                id: vm.creditCard.id,
                user: user
            };


            var arr = Object.keys(vm.tempCard).map(function (k) {
                return vm.tempCard[k]
            });

            var data = arr.slice(0, 5).join("##");

            // Create a temp payment object
            var payment = {
                id: vm.tempCard.id,
                ccdata: data,
                user: user
            };

            // Update or save the credit card data
            if (payment.id !== null) {
                Payment.update(payment, onSaveSuccess, onSaveError);
            } else {
                payment.user = vm.tempCard.user;
                Payment.save(payment, onSaveSuccess, onSaveError);
            }
        }
function onSaveSuccess(resp) {
    console.log("GOOD resp", resp);
}
function onSaveError(resp) {
    console.log("BAD resp", resp);
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

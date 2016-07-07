(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate', 'Payment', 'Groupaccess', 'Useraccount', 'User', 'Focus'];

    function SettingsController(Principal, Auth, JhiLanguageService, $translate, Payment, Groupaccess, Useraccount, User, focus) {
        var vm = this;

        vm.error = null;
        vm.save = save;
        vm.addCard = addCard;
        vm.settingsAccount = null;
        vm.creditCard = null;
        vm.success = null;
        vm.authorizedUsers = [];
        // vm.authorizedUsers = {};
        vm.isAlreadyAuthorized;
        vm.getAuthorizedUsers = getAuthorizedUsers;
        vm.numberTab = numberTab;
        vm.checkAuthorized = checkAuthorized;
        vm.addAuthorizedUser = addAuthorizedUser;
        vm.removeAuthorizedUsers = removeAuthorizedUsers;
        vm.authorizedUser = '';
        getAuthorizedUsers()
        checkAuthorized();
        Payment.query(function(result){
            result.find(function(ccdata){
                if(ccdata.user.login === vm.settingsAccount.login){ var data = ccdata.ccdata.split('##')
                    vm.creditCard = {
                        name: data[0],
                        number: {
                            one: parseInt(data[1].match(/.{1,4}/g)[0]),
                            two: parseInt(data[1].match(/.{1,4}/g)[1]),
                            three: parseInt(data[1].match(/.{1,4}/g)[2]),
                            four: parseInt(data[1].match(/.{1,4}/g)[3])
                        },
                        month: data[2],
                        year: data[3],
                        cvv: parseInt(data[4]),
                        id: ccdata.id,
                        user: ccdata.user
                    }
                    console.log(vm.creditCard);
                }
            })
        })
        function numberTab(event){
            if(event.target.value.length === event.target.maxLength){
                var currentNumber = event.target.id.match(/\d+/);
                if(currentNumber && currentNumber[0] < 4){
                    var newNumber = parseInt(currentNumber[0]) + 1;
                    focus('ccNumber' + newNumber);
                }
                event.preventDefault();
            }
        }
        /**
        * Store the "settings account" in a separate variable, and not in the shared "account" variable.
        */
        var copyAccount = function (account) {
            return {
                activated: account.activated,
                email: account.email,
                firstName: account.firstName,
                langKey: account.langKey,
                lastName: account.lastName,
                login: account.login
            };
        };

        Principal.identity().then(function (account) {
            vm.settingsAccount = copyAccount(account);
        });
        function checkAuthorized(){
            Groupaccess.query(function(result){
                result.find(function(user){
                    if(user.authorizeduser.login === vm.settingsAccount.login){
                        console.log("AUTHORISED");
                        vm.isAlreadyAuthorized = true;
                    } else {
                        console.log("NOPE");
                        vm.isAlreadyAuthorized = false;
                    }
                })
            })
        }
        function save() {
            Auth.updateAccount(vm.settingsAccount).then(function () {
                vm.error = null;
                vm.success = 'OK';
                Principal.identity(true).then(function (account) {
                    vm.settingsAccount = copyAccount(account);
                });
                JhiLanguageService.getCurrent().then(function (current) {
                    if (vm.settingsAccount.langKey !== current) {
                        $translate.use(vm.settingsAccount.langKey);
                    }
                });
            }).catch(function () {
                vm.success = null;
                vm.error = 'ERROR';
            });
        }
        function addCard() {
            var number = Object.keys(vm.creditCard.number).map(function(k) { return vm.creditCard.number[k] });
            vm.creditCard.number = number.join('');
            var arr = Object.keys(vm.creditCard).map(function(k) { return vm.creditCard[k] });
            console.log(arr);
            var data = arr.slice(0, 5).join("##")
            console.log("NO ID?", vm.creditCard.id);
            var payment = {
                id: vm.creditCard.id,
                ccdata: data,
                user: vm.creditCard.user
            }
            if (payment.id !== null) {
                Payment.update(payment, onSaveSuccess, onSaveError);
            } else {
                payment.user = vm.creditCard.user
                console.log(payment);
                Payment.save(payment, onSaveSuccess, onSaveError);
            }
            console.log(arr.join("##"));
        }
        function onSaveSuccess(payment){
            console.log(payment);
            vm.creditCard.id = payment.id;
            vm.creditCard.user = payment.user;
            vm.error = null;
            vm.success = 'OK';
        }
        function onSaveError(error){
            console.log(error);
            vm.error = 'ERROR';
            vm.success = null;
        }
        function addAuthorizedUser(){
            var newUsers = vm.authorizedUser.split(',');
            User.query(function(result){
                result.find(function(user){
                    newUsers.forEach(function(newUser){
                        if(user.email === newUser){
                            console.log(user);
                            var group = {
                                authorizeduser: user,
                            }
                            Groupaccess.save(group, function(data){
                                vm.authorizedUsers.push(data)
                                vm.authorizedUser = '';
                            })
                        }
                    })
                })
            })
        }

        function getAuthorizedUsers() {
            vm.authorizedUsers = [];
            Groupaccess.query(function(result){
                result.find(function(user){
                    if(user.user.login === vm.settingsAccount.login){
                        vm.authorizedUsers.push(user);
                        console.log("current", vm.authorizedUsers);
                    }
                })
            })
        }

        function removeAuthorizedUsers(id, index) {
            Groupaccess.delete({id: id})
            vm.authorizedUsers.splice(index, 1)
        }
        // function removeAuthorizedUsers(user) {
        //     delete vm.authorizedUsers[user];
        // }
    }
})();

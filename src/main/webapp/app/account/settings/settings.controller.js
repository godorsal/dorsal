(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate', 'Payment', 'Groupaccess', 'Useraccount', 'User', 'Focus', 'Register', 'toastr', 'ExpertAccount'];

    function SettingsController(Principal, Auth, JhiLanguageService, $translate, Payment, Groupaccess, Useraccount, User, focus, Register, toastr, ExpertAccount) {
        var vm = this;

        vm.error = null;
        vm.save = save;
        vm.addCard = addCard;
        vm.settingsAccount = null;
        vm.creditCard = null;
        vm.success = null;
        vm.authorizedUsers = [];
        vm.invitedUsers = [];
        vm.invitedUsersToRemove = [];
        vm.activatedUsersToRemove = [];
        vm.isAlreadyAuthorized;
        vm.getAuthorizedUsers = getAuthorizedUsers;
        vm.numberTab = numberTab;
        vm.addAuthorizedUser = addAuthorizedUser;
        vm.removeAuthorizedUsers = removeAuthorizedUsers;
        vm.removeInvitedUsers = removeInvitedUsers;
        vm.authorizedUser = '';
        vm.number = 0;
        vm.isExpert = false;

        getAuthorizedUsers()

        ExpertAccount.query(function(data){
            if(data[0]){
                vm.currentExpert = data[0];
            }
        });
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
        function save() {
            if(vm.updatingUser && vm.updatingExpert){
                toastr["success"]("User and Expert Info Saved")
                updateExpert();
                updateUser();
            } else if(vm.updatingUser){
                updateUser();
            } else if(vm.updatingExpert){
                updateExpert();
            }
        }
        function updateUser() {
            Auth.updateAccount(vm.settingsAccount).then(function () {
                vm.error = null;
                if (!vm.updatingExpert) {
                    toastr["success"]("User Info Saved")
                }
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
                toastr["error"]("Saving Error")
            });
        }
        function updateExpert(){
            ExpertAccount.update(vm.currentExpert, function(){
                if(!vm.updatingUser){
                    toastr["success"]("Expert Info Saved")
                }
            });
        }
        function addCard() {
            vm.number = Object.keys(vm.creditCard.number).map(function(k) { return vm.creditCard.number[k] });
            if(vm.number.join('').length != 16 || vm.creditCard.cvv.toString().length != 3) {
                toastr["error"]("Saving Error")
                return;
            }
            vm.creditCard.number = vm.number.join('');
            var arr = Object.keys(vm.creditCard).map(function(k) { return vm.creditCard[k] });

            var data = arr.slice(0, 5).join("##")
            var payment = {
                id: vm.creditCard.id,
                ccdata: data,
                user: vm.creditCard.user
            }
            if (payment.id !== null) {
                Payment.update(payment, onSaveSuccess, onSaveError);
            } else {
                payment.user = vm.creditCard.user
                Payment.save(payment, onSaveSuccess, onSaveError);
            }
        }
        function onSaveSuccess(payment){
            vm.creditCard.id = payment.id;
            vm.creditCard.user = payment.user;
            vm.error = null;
            toastr["success"]("Saving Successful")
        }
        function onSaveError(error){
            vm.success = null;
            toastr["error"](data.authorizeduser.email, "Saving Error")

        }
        function onUserSaveSuccess(user){
            var group = {
                authorizeduser: user,
            }
            Groupaccess.save(group, function(data){
                vm.authorizedUsers.push(data)
                vm.authorizedUser = '';
            })
        }
        function onUserSaveError(error){
            toastr["error"]("Incorrect " + error.data.fieldErrors[0].field + " input")
        }
        function makeUser(email){
            var inviteString = "Invite:" + vm.settingsAccount.firstName + " " + vm.settingsAccount.lastName;
            var newUser = {
                email: email,
                langKey: $translate.use(),
                login: email,
                password: 'myDorsal',
                lastName: inviteString.substring(0, 50)
            }
            Register.save(newUser, invitedGroup,  onUserSaveError)
        }
        function authorizedGroup(user){
            var group = {
                authorizeduser: user,
            }
            if (user.activated) {
                Groupaccess.save(group, function(data){
                    vm.authorizedUsers.push(data)
                    vm.invitedUser = '';
                    toastr["success"](data.authorizeduser.email, "Added Activated User")
                })
            } else {
                Groupaccess.save(group, function(data){
                    vm.invitedUsers.push(data)
                    vm.invitedUser = '';
                })
            }
        }
        function invitedGroup(newUser){
            User.query(function(result){
                var userWithId = result.find(function(user){
                    return user.login == newUser.login;
                })
                var group = {
                    authorizeduser: userWithId,
                }
                Groupaccess.save(group, function(data){
                    vm.invitedUsers.push(data)
                    vm.invitedUser = '';
                    toastr["success"](data.authorizeduser.email, "Invited User")
                })
            })
        }
        function addAuthorizedUser(){
            var currentEmails = vm.invitedUser.split(',');
            currentEmails.forEach(function(currentEmail){
                var isAlreadyInvited = vm.invitedUsers.find(function(invited){
                    if(invited.authorizeduser.email == currentEmail){
                        return true;
                    }
                })
                var isAlreadyAuthorized = vm.authorizedUsers.find(function(authorized){
                    if(authorized.authorizeduser.email == currentEmail){
                        return true;
                    }
                })
                if(!isAlreadyInvited && !isAlreadyAuthorized){
                    User.query(function(result){
                        var newUser = result.find(function (user) {
                            return user.email == currentEmail;
                        })
                        if(newUser){
                            authorizedGroup(newUser);
                        } else {
                            makeUser(currentEmail);
                        }
                    })
                } else {
                    toastr["error"]("User is already invited")
                }
            })
        }


        function getAuthorizedUsers() {
            vm.authorizedUsers = [];
            Groupaccess.query(function(result){
                result.find(function(user){
                    if(user.user.login === vm.settingsAccount.login && user.authorizeduser.activated){
                        vm.authorizedUsers.push(user);
                    } else if(user.user.login === vm.settingsAccount.login && !user.authorizeduser.activated){
                        vm.invitedUsers.push(user);
                    }
                })
            })
        }

        function removeInvitedUsers(id, index) {
                Groupaccess.delete({id: id})
                toastr["warning"]("User Removed")
                vm.invitedUsers.splice(index, 1)
        }
        function removeAuthorizedUsers(id, index) {
                Groupaccess.delete({id: id})
                toastr["warning"]("User Removed")
                vm.authorizedUsers.splice(index, 1)
        }
    }
})();

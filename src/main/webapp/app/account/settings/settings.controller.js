(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate', 'Payment', 'Groupaccess', 'Useraccount', 'User', 'Focus', 'Register', 'toastr', 'ExpertAccount', 'Issue', 'Technology', '_', '$state'];

    function SettingsController(Principal, Auth, JhiLanguageService, $translate, Payment, Groupaccess, Useraccount, User, focus, Register, toastr, ExpertAccount, Issue, Technology, _, $state) {
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
        vm.updateUser = updateUser;
        vm.authorizedUser = '';
        vm.number = 0;
        vm.isExpert = false;
        vm.issues = Issue.query();
        vm.technologies = Technology.query();

        getAuthorizedUsers()

        ExpertAccount.query(function(data){
            if(data[0]){
                vm.currentExpert = data[0];
                var othercommunication = vm.currentExpert.othercommunication.split(',');
                vm.otherLink = othercommunication[0];
                vm.otherTitle = othercommunication[1];
                if(vm.currentExpert.numberOfCases > 0){
                    vm.displayedExpertScore = Math.round(vm.currentExpert.expertScore / vm.currentExpert.numberOfCases);
                } else {
                    vm.displayedExpertScore = vm.currentExpert.expertScore;
                }
            }
        });
        Payment.query(function(result){
            _.find(result, function(ccdata){
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
                vm.success = 'OK';
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
                if(vm.isAlreadyAuthorized){
                    $state.go('case');
                }
            }).catch(function () {
                vm.success = null;
                vm.error = 'ERROR';
                toastr["error"]("Saving Error")
            });
        }
        function updateExpert(){
            vm.currentExpert.othercommunication = vm.otherLink + ',' + vm.otherTitle;
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
            vm.tempCard = {
                name: vm.creditCard.name,
                number: vm.number.join(''),
                month: vm.creditCard.month,
                year: vm.creditCard.year,
                cvv: vm.creditCard.cvv,
                id: vm.creditCard.id,
                user: vm.creditCard.user
            }
            var arr = Object.keys(vm.tempCard).map(function(k) { return vm.tempCard[k] });

            var data = arr.slice(0, 5).join("##")
            var payment = {
                id: vm.tempCard.id,
                ccdata: data,
                user: vm.tempCard.user
            }
            if (payment.id !== null) {
                Payment.update(payment, onSaveSuccess, onSaveError);
            } else {
                payment.user = vm.tempCard.user
                Payment.save(payment, onSaveSuccess, onSaveError);
            }
        }
        function onSaveSuccess(payment){
            vm.tempCard.id = payment.id;
            vm.tempCard.user = payment.user;
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
            if(vm.settingsAccount.firstName && vm.settingsAccount.lastName){
                var inviteString = "Invite:" + vm.settingsAccount.firstName + " " + vm.settingsAccount.lastName;
            } else {
                var inviteString = "Invite:" + vm.settingsAccount.email;
            }
            var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            var randomNewPassword = '';
            for(var i = 0; i < 5; i++){
        		var randomIndex = Math.floor(Math.random() * charSet.length);
        		randomNewPassword += charSet.substring(randomIndex,randomIndex+1);
        	}
        	randomNewPassword = randomNewPassword + Math.floor(Math.random() * 9);
        	inviteString = inviteString + ':' + randomNewPassword;
        	var newUser = {
                email: email,
                langKey: $translate.use(),
                login: email,
                password: randomNewPassword,
                lastName: inviteString.substring(0, 50)
            }
            Register.save(newUser, invitedGroup,  onUserSaveError)
        }
        function authorizedGroup(user){
            console.log("AUTHORIZING USER");
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
            console.log("HERE IS THE NEW USER, HE HAS NO ID!", newUser);
            User.query({size: 200}, function(result){
                console.log(result);
                var userWithId = _.find(result, function(user){
                    return user.login == newUser.login;
                })
                var group = {
                    authorizeduser: userWithId,
                }
                Groupaccess.save(group, function(data){
                    console.log(data);
                    vm.invitedUsers.push(data)
                    vm.invitedUser = '';
                    toastr["success"](data.authorizeduser.email, "Invited User")
                })
            })
        }
        function addAuthorizedUser(){
            var currentEmails = vm.invitedUser.split(',');
            currentEmails.forEach(function(currentEmail){
                if(currentEmail === vm.settingsAccount.email){
                    toastr["error"]("Users cannot invite themselves")
                    return
                }
                var isAlreadyInvited = _.find(vm.invitedUsers, function(invited){
                    if(invited.authorizeduser.email == currentEmail){
                        return true;
                    }
                })
                var isAlreadyAuthorized = _.find(vm.authorizedUsers, function(authorized){
                    if(authorized.authorizeduser.email == currentEmail){
                        return true;
                    }
                })
                if(!isAlreadyInvited && !isAlreadyAuthorized){
                    User.query({size: 200}, function(result){
                        var newUser = _.find(result, function (user) {
                            return user.email == currentEmail;
                        })
                        if(newUser){
                            console.log("Found user, time to Authorize");
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
                _.find(result, function(user){
                    if(user.authorizeduser.email === vm.settingsAccount.email){
                        vm.isAlreadyAuthorized = true;
                    } else if(user.user.login === vm.settingsAccount.login && user.authorizeduser.activated){
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

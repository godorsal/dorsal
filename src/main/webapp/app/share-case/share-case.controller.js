(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ShareCaseController', ShareCaseController);

    ShareCaseController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'User', 'SharedCase', 'Register', 'Principal'];

    function ShareCaseController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, User, SharedCase, Register, Principal) {
        var vm = this;
        vm.cancel = cancel;
        vm.addUser = addUser;
        vm.removeSharedUser = removeUser;
        vm.case = drslCase;
        vm.expert = expert;
        vm.sharedUsers = [];
        vm.summary = vm.case.summary.toString();
        getSharedUsers();
        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }
        Principal.identity().then(function (account) {
            vm.currentUser = account;
        });
        function makeUser(email){
            var inviteString = "Share:" + vm.currentUser.firstName + " " + vm.currentUser.lastName;
            var newUser = {
                email: email,
                langKey: $translate.use(),
                login: email,
                password: 'myDorsal',
                lastName: inviteString.substring(0, 50)
            }
            Register.save(newUser, shareCaseNew)
        }
        function shareCaseNew(newUser){
            User.query(function(users){
                newUser = users.find(function(user){
                    return user.email === newUser.email
                })
                var newSharedCase = {
                    user: newUser,
                    supportcase: vm.case
                }
                SharedCase.save(newSharedCase, function(data){
                    vm.sharedUsers.push(data)
                    vm.emailInput = '';
                })
            })
        }
        function shareCase(newUser){
            var newSharedCase = {
                user: newUser,
                supportcase: vm.case
            }
            SharedCase.save(newSharedCase, function(data){
                vm.sharedUsers.push(data)
                vm.emailInput = '';
            }, function(error){
            })
        }
        function addUser() {
            var newUsers = vm.emailInput.split(',');
            newUsers.forEach(function(currentEmail){
                User.query(function(result){
                    var newUser = result.find(function (user) {
                        return user.email == currentEmail;
                    })
                    if(newUser){
                        shareCase(newUser)
                    } else {
                        makeUser(currentEmail);
                    }
                })
            })
            // User.query(function(result){
            //     result.find(function(user){
            //         newUsers.forEach(function(newUser){
            //             var isAlreadyShared = vm.sharedUsers.find(function(shared){
            //                 if(shared.user.email == newUser){
            //                     return true;
            //                 }
            //             })
            //             if(user.email === newUser){
            //                 var newSharedCase = {
            //                     user: user,
            //                     supportcase: vm.case
            //                 }
            //                 SharedCase.save(newSharedCase, function(data){
            //                     vm.sharedUsers.push(data)
            //                     vm.emailInput = '';
            //                 })
            //             }
            //         })
            //     })
            // })
        }
        function getSharedUsers() {
            SharedCase.query(function(result){
                result.find(function(user){
                    if(user.supportcase.id === vm.case.id){
                        vm.sharedUsers.push(user);
                    }
                })
            })
        }
        function removeUser(id, index) {
            SharedCase.delete({id: id})
            vm.sharedUsers.splice(index, 1)
        }
    }
})();

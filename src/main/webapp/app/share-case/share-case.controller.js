(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ShareCaseController', ShareCaseController);

    ShareCaseController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'User', 'SharedCase', 'Register'];

    function ShareCaseController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, User, SharedCase, Register) {
        var vm = this;
        vm.cancel = cancel;
        vm.addUser = addUser;
        vm.removeSharedUser = removeUser;
        vm.case = drslCase;
        vm.expert = expert;
        vm.sharedUsers = [];
        vm.summary = vm.case.summary.toString();
        console.log(vm.case);
        getSharedUsers();
        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }
        function makeUser(email){
            var newUser = {
                email: email,
                langKey: $translate.use(),
                login: email,
                password: 'myDorsal'
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
                    console.log(data);
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
                console.log(data);
                vm.sharedUsers.push(data)
                vm.emailInput = '';
            })
        }
        function addUser() {
            console.log(vm.emailInput);
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
            //                 console.log(user);
            //                 var newSharedCase = {
            //                     user: user,
            //                     supportcase: vm.case
            //                 }
            //                 SharedCase.save(newSharedCase, function(data){
            //                     console.log(data);
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
                    if(user.owner.login === vm.case.user.login){
                        vm.sharedUsers.push(user);
                        console.log("current", vm.sharedUsers);
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

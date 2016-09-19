(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ShareCaseController', ShareCaseController);

    ShareCaseController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'User', 'SharedCase', 'Register', 'Principal', 'toastr', 'ManageUser'];

    function ShareCaseController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, User, SharedCase, Register, Principal, toastr, ManageUser) {
        var vm = this;
        vm.cancel = cancel;
        vm.addUser = addUser;
        vm.removeSharedUser = removeUser;
        vm.case = drslCase;
        vm.expert = expert;
        vm.sharedUsers = [];
        vm.summary = vm.case.summary.toString();
        getSharedUsers();
        vm.usersToQuery = 200;

        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }
        Principal.identity().then(function (account) {
            vm.currentUser = account;
        });
        function makeUser(email){
            if(vm.currentUser.firstName &&  vm.currentUser.lastName){
                var inviteString = "Share:" + vm.currentUser.firstName + " " + vm.currentUser.lastName;
            } else {
                var inviteString = "Share:" + vm.currentUser.email;
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
            Register.save(newUser, shareCaseNew)
        }
        function shareCaseNew(newUser){
            ManageUser.get({type: 'email', value: newUser.email}, function(user){
                var newSharedCase = {
                    user: user,
                    supportcase: vm.case
                }
                SharedCase.save(newSharedCase, function(data){
                    vm.sharedUsers.push(data)
                    vm.emailInput = '';
                }, shareCaseFail)
            })
        }
        function shareCaseFail(error){
            toastr["error"]("Case sharing failure")
        }
        function shareCase(newUser){
            var newSharedCase = {
                user: newUser,
                supportcase: vm.case
            }
            SharedCase.save(newSharedCase, function(data){
                vm.sharedUsers.push(data)
                vm.emailInput = '';
            }, shareCaseFail)
        }
        function addUser() {
            var newUsers = vm.emailInput.split(',');
            newUsers.forEach(function(currentEmail){
                if(currentEmail === vm.currentUser.email){
                    toastr["error"]("Users cannot invite themselves")
                    return
                }
                var alreadySharing = _.find(vm.sharedUsers, function(sharedUser){
                    if(sharedUser.user.email === currentEmail){
                        toastr["error"]("User is already invited")
                        return true;
                    }
                })
                if(!alreadySharing){
                    ManageUser.get({type: 'email', value: currentEmail}, function(result){
                        if(result.id){
                            shareCase(result)
                        } else {
                            makeUser(currentEmail);
                        }
                    })
                }
            })
        }
        function getSharedUsers() {
            SharedCase.query(function(result){
                _.find(result, function(user){
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

(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('ShareCaseController', ShareCaseController);

    ShareCaseController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'User', 'SharedCase'];

    function ShareCaseController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, User, SharedCase) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.addUser = addUser;
        vm.removeSharedUser = removeUser;
        // vm.updateUser = updateUser;
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

        function submit() {
            // vm.case.summary = vm.summary.toString();
            // $uibModalInstance.close({"updated": true});
        }
        function addUser() {
            console.log(vm.emailInput);
            var newUsers = vm.emailInput.split(',');
            User.query(function(result){
                result.find(function(user){
                    newUsers.forEach(function(newUser){
                        if(user.email === newUser){
                            console.log(user);
                            var newSharedCase = {
                                user: user,
                                supportcase: vm.case
                            }
                            SharedCase.save(newSharedCase, function(data){
                                console.log(data);
                                vm.sharedUsers.push(data)
                                vm.emailInput = '';
                            })
                        }
                    })
                })
            })
        }
        function getSharedUsers() {
            console.log("Heyo?");
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
        // function updateUser(index, user) {
        //     vm.sharedUsers.splice(index, 1, user);
        //     localStorage.setItem('sharedUsers', JSON.stringify(vm.sharedUsers));
        //     console.log(vm.sharedUsers);
        // }
    }
})();

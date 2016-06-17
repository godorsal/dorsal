(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ShareCaseController', ShareCaseController);

    ShareCaseController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert'];

    function ShareCaseController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.addUser = addUser;
        vm.case = drslCase;
        vm.expert = expert;
        // localStorage.setItem('sharedUsers', '[]');
        vm.sharedUsers = JSON.parse(localStorage.getItem('sharedUsers'));
        // vm.sharedUsers = [];
        vm.summary = vm.case.summary.toString();
        // console.log(JSON.parse(localStorage.getItem('sharedUsers')));

        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            vm.case.summary = vm.summary.toString();
            $uibModalInstance.close({"updated": true});
        }
        function addUser() {
            // console.log(vm.emailInput.indexOf(vm.emailInput));
            if(vm.sharedUsers.indexOf(vm.emailInput) < 0){
                var newUser = {
                    name: vm.emailInput,
                    permissions: 'read'
                }
                vm.sharedUsers.push(newUser);
                // vm.sharedUsers.push(vm.emailInput);
                vm.emailInput = '';
                localStorage.setItem('sharedUsers', JSON.stringify(vm.sharedUsers));

            } else {
                vm.emailInput = 'User already added';
            }
        }
    }
})();

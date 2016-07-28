(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ActivationController', ActivationController);

    ActivationController.$inject = ['$stateParams', 'Auth', 'LoginService'];

    function ActivationController ($stateParams, Auth, LoginService) {
        var vm = this;
            vm.success = 'OK';

        // Auth.activateAccount({key: $stateParams.key}).then(function () {
        //     vm.error = null;
        //     vm.success = 'OK';
        // }).catch(function () {
        //     vm.success = null;
        //     vm.error = 'ERROR';
        // });

        vm.login = LoginService.open;
    }
})();

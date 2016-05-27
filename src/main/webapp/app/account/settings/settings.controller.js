(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate'];

    function SettingsController(Principal, Auth, JhiLanguageService, $translate) {
        var vm = this;

        vm.error = null;
        vm.save = save;
        vm.settingsAccount = null;
        vm.success = null;
        vm.authorizedUsers = {};
        vm.getAuthorizedUsers = getAuthorizedUsers;
        vm.addAuthorizedUser = addAuthorizedUser;
        vm.removeAuthorizedUsers = removeAuthorizedUsers;
        vm.authorizedUser = '';

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

        function addAuthorizedUser(){
            vm.authorizedUsers[vm.authorizedUser] = vm.authorizedUser;
            vm.authorizedUser = '';
        }

        function getAuthorizedUsers() {
            var user, users = [];

            for (user in vm.authorizedUsers) {
                if (vm.authorizedUsers.hasOwnProperty(user)){
                    users.push(user);
                }
            }

            users.sort();

            return users;
        }

        function removeAuthorizedUsers(user) {
            delete vm.authorizedUsers[user];
        }
    }
})();

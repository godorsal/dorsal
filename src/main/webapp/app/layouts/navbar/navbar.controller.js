(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', '$scope', 'Auth', 'Principal', 'ProfileService', 'LoginService', 'ElementFocusService', 'DrslMetadata', 'DrslUserFlowService'];

    function NavbarController($state, $scope, Auth, Principal, ProfileService, LoginService, ElementFocusService, DrslMetadata, DrslUserFlowService) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.accountFirstName = null;

        ProfileService.getProfileInfo().then(function (response) {
            vm.inProduction = response.inProduction;
            vm.swaggerDisabled = response.swaggerDisabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;
        vm.searchExpanded = false;
        vm.expandSearch = expandSearch;
        vm.collapseSearch = collapseSearch;
        vm.submitSearch = submitSearch;
        vm.getIdentity = getIdentity;
        vm.searchTerm = '';
        vm.getIdentity();
        vm.DrslMetadata = DrslMetadata;

        vm.DUFS = DrslUserFlowService;
        // console.log("IS EXPERT?!", DrslUserFlowService.user);
        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            DrslUserFlowService.clearUserData();
            $scope.$emit('logoutDeleteConciergeRoom')
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }

        function expandSearch() {
            vm.searchExpanded = true;
            ElementFocusService('drslSearch');
        }

        function collapseSearch() {
            vm.searchExpanded = false;
        }

        function submitSearch() {
            vm.searchExpanded = false;
            vm.searchTerm = '';
        }

        function getIdentity() {
            Principal.identity().then(function (account) {
                if (account) {
                    vm.accountFirstName = (account.firstName) ? account.firstName : account.email;
                }
            });
        }

        $scope.$on('authenticationSuccess', function () {
            vm.getIdentity();
        });
    }
})();

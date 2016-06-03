(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService', 'LoginService', 'ElementFocusService'];

    function NavbarController ($state, Auth, Principal, ProfileService, LoginService, ElementFocusService) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
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
        vm.searchTerm = '';

        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
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
    }
})();

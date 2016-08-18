(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.concierge = concierge;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
                if(vm.account && !vm.account.firstName && !vm.account.lastName.length){
                    $state.go('settings')
                } else if(vm.account){
                    $state.go('case')
                }
            });
        }
        function register () {
            $state.go('register');
        }
        $scope.quoteSize = function(index){
            if(index === 0){
                return "drsl-fast-easy-access";
            } else if(index === 1){
                return "drsl-personalized-for-you"
            } else if(index === 2){
                return "drsl-certified-professionals"
            }
        }
        function concierge(type) {
            switch (type) {
                case 1:
                $state.go('concierge', {'type': 'incident'});
                break;
                case 2:
                $state.go('concierge', {"type": 'pro-active'});
                break;
                case 3:
                $state.go('concierge', {"type": 'on-demand'});
                break;
                default:
                $state.go('concierge', {"type": 'connect-now'});
                break;
            }
        }
    }
})();

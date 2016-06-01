(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('LeaderboardController', LeaderboardController);

    LeaderboardController.$inject = ['$scope', '$state', 'LoginService', 'Principal', '$translate'];

    function LeaderboardController($scope, $state, LoginService, Principal, $translate) {
        var vm = this;

        vm.init = init;

        /**
         * Initialize the controller's data.
         */
        function init(){
        }

        // Call to initialize the controller.
        vm.init();
    }
})();

(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['DrslUserFlowService'];

    function HomeController(DrslUserFlowService) {
        DrslUserFlowService.handleUserFlow();

        // Set the view model and view model properties/methods
        var vm = this;
        vm.additionalInfoItemClassName = additionalInfoItemClassName;

        /**
         * Returns the css class name for an additional info item, for a given slot/index.
         * @param index
         * @returns {string} the css class name for an additional info item, for a given slot/index.
         */
        function additionalInfoItemClassName(index) {
            if (index === 0) {
                return "drsl-fast-easy-access";
            } else if (index === 1) {
                return "drsl-personalized-for-you"
            } else if (index === 2) {
                return "drsl-certified-professionals"
            }
        }
    }
})();

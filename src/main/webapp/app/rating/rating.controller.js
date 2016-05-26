(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('RatingController', RatingController);

    RatingController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate'];

    function RatingController ($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;

        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            $uibModalInstance.close({"status":"completed"});
        }
    }
})();

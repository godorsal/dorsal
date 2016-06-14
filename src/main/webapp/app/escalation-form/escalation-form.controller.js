(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('EscalationFormController', EscalationFormController);

    EscalationFormController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert'];

    function EscalationFormController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.case = drslCase;
        vm.expert = expert;
        vm.summary = vm.case.summary.toString();

        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            vm.case.summary = vm.summary.toString();
            $uibModalInstance.close({"updated": true});
        }
    }
})();

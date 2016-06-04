(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseDetailsController', CaseDetailsController);

    CaseDetailsController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert'];

    function CaseDetailsController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.case = drslCase;
        vm.expert = expert;
        vm.summary = vm.case.summary.toString();

        console.log(vm.case);

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

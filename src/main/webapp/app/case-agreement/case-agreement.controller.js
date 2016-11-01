(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseAgreementController', CaseAgreementController);

    CaseAgreementController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'DrslMetadata', '$document'];

    function CaseAgreementController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, DrslMetadata, $document) {
        var vm = this;

        vm.case = drslCase;
        vm.expert = expert;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.agreeToEstimate = false;
        vm.DrslMetadata = DrslMetadata;

        $document.keyup(function(e) {
             if (e.keyCode == 27) {
                 cancel ()
            }
        });

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            if (vm.agreeToEstimate) {
                $uibModalInstance.close({"rated": true});
            }
        }
    }
})();

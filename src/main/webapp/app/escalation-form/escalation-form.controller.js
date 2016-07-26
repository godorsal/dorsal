(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('EscalationFormController', EscalationFormController);

    EscalationFormController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'EscalateCase'];

    function EscalationFormController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, EscalateCase) {
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
        EscalateCase.query(function(data){
            vm.thisEscalation = data.find(function(escalation){
                return escalation.supportcase.id == vm.case.id;
            })
        })
        function submit() {
            vm.escalation = vm.thisEscalation;
            vm.escalation.escalationType = vm.thisEscalation.escalationType
            vm.escalation.reason = vm.thisEscalation.reason
            vm.escalation.supportcase = vm.case
            if (vm.escalation.id !== null) {
                EscalateCase.update(vm.escalation);
            } else {
                EscalateCase.save(vm.escalation);
            }
            $uibModalInstance.close({"updated": true})
        }
    }
})();

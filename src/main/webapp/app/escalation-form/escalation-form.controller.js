(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('EscalationFormController', EscalationFormController);

    EscalationFormController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'EscalateCase', 'Casetechnologyproperty'];

    function EscalationFormController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, EscalateCase, Casetechnologyproperty) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.case = drslCase;
        vm.expert = expert;
        vm.technologyProps = [];
        vm.summary = vm.case.summary.toString();
        vm.escalationType = {};
        vm.issue = {};
        vm.escalationTypes = [
            {
                type: "escalation",
                values: [
                    {
                        code: "escalation",
                        value: "Escalation",
                        id: 1,
                        label: "Escalation",
                        name:"Escalation"
                    },
                    {
                        code: "reassign",
                        value: "Reassign",
                        id: 2,
                        label: "Reassign",
                        name:"Reassign"
                    },
                    {
                        code: "escalate_reassign",
                        value: "Escalate_Reassign",
                        id: 3,
                        label: "Escalate and Reassign",
                        name:"Escalate and Reassign"
                    }
                ]
            }
        ]
        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }
        EscalateCase.query(function(data){
            vm.thisEscalation = data.find(function(escalation){
                return escalation.supportcase.id == vm.case.id;
            })
        })
        // Casetechnologyproperty.query(function(result) {
        //     result.forEach(function(property){
        //         if(property.supportcase.id === vm.case.id){
        //             vm.technologyProps.push(property)
        //         }
        //     })
        // });
        Casetechnologyproperty.query(function(result) {
            result.forEach(function(property){
                if(property.supportcase.id === vm.case.id){
                    switch (property.propertyname) {
                        case 'Version':
                        property.tagNO = 1;
                        vm.technologyProps.push(property)
                        break;
                        case 'Configuration':
                        property.tagNO = 2;
                        vm.technologyProps.push(property)
                        break;
                        case 'OS':
                        property.tagNO = 3;
                        vm.technologyProps.push(property)
                        break;
                        case 'Environment':
                        property.tagNO = 4;
                        vm.technologyProps.push(property)
                        break;
                        case 'Other':
                        property.tagNO = 5;
                        vm.technologyProps.other = property
                        vm.technologyProps.push(property)
                        break;

                    }
                }
            })
        });
        function submit() {
            vm.escalation = vm.thisEscalation;
            vm.escalation.escalationType = vm.issue.value
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

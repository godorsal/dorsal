(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('EscalationFormController', EscalationFormController);

    EscalationFormController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'EscalateCase', 'Casetechnologyproperty', '$scope'];

    function EscalationFormController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, EscalateCase, Casetechnologyproperty, $scope) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.case = drslCase;
        vm.expert = expert;
        vm.checkStatus = checkStatus;
        vm.technologyProps = [];
        vm.summary = vm.case.summary.toString();
        vm.escalationType = {};
        vm.issue = {};
        vm.thisEscalation = {};
        checkStatus();
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
                        value: "Escalate and Reassign",
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
            _.find(data, function(escalation){
                if(escalation.supportcase.id == vm.case.id){
                    vm.thisEscalation = escalation;
                }
            })
        })
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
        function checkStatus(){
            if(!vm.thisEscalation.reason){
                vm.requestMessage = "Reason for escalation or reassignment is required";
            } else if(!vm.issue.value) {
                vm.requestMessage = "Escalation type is required";
            } else {
                vm.requestMessage = "";
            }
        }
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

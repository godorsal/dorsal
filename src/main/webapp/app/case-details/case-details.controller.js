(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('CaseDetailsController', CaseDetailsController);

    CaseDetailsController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'Casetechnologyproperty', 'Caseupdate', 'Attachment'];

    function CaseDetailsController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, Casetechnologyproperty, Caseupdate, Attachment) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.case = drslCase;
        vm.expert = expert;
        vm.summary = vm.case.summary.toString();
        vm.technologyProps = [];
        vm.updates = [];
        vm.caseupdate = {
            user: vm.case.user,
            supportcase: vm.case
        };
        vm.attachment = {
            name: null,
            url: null,
            dataStream: null,
            dataStreamContentType: null,
            id: null
        };
        Caseupdate.query(function(result){
            result.reverse().forEach(function(update){
                if(update.supportcase.id === vm.case.id){
                    vm.updates.push(update)
                }
            })
        })
        Casetechnologyproperty.query(function(result) {
            result.forEach(function(property){
                if(property.supportcase.id === vm.case.id){
                    vm.technologyProps.push(property)
                }
            })
        });

        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }
        function onSaveSuccess (result){
            vm.attachment.supportcase = {
                id: vm.case.id
            }
            console.log(vm.attachment);
            Attachment.save(vm.attachment);
        }
        function onSaveError (){
            console.log("COMPLETE FAILURE");
        }
        function submit() {
            vm.caseupdate.updateMsg = vm.updatemsg;
            console.log("Case", vm.caseupdate);
            if (vm.caseupdate.id !== null) {
                Caseupdate.update(vm.caseupdate, onSaveSuccess, onSaveError);
            } else {
                Caseupdate.save(vm.caseupdate, onSaveSuccess, onSaveError);
            }
            vm.case.summary = vm.summary.toString();
            $uibModalInstance.close({"updated": true});
        }
    }
})();

(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('CaseDetailsController', CaseDetailsController);

    CaseDetailsController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'Casetechnologyproperty', 'Caseupdate', 'Attachment', 'Principal', 'Updatetype', 'Supportcase'];

    function CaseDetailsController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, Casetechnologyproperty, Caseupdate, Attachment, Principal, Updatetype, Supportcase) {
        var vm = this;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.case = drslCase;
        vm.expert = expert;
        vm.summary = vm.case.summary.toString();
        vm.technologyProps = [];
        vm.updates = [];
        vm.detailedResolutions = [];
        vm.updatemsg = '';
        vm.capitalizeFirstLetter = capitalizeFirstLetter;
        vm.caseupdate = {
            user: vm.case.user,
            supportcase: vm.case,
        };
        vm.attachment = {
            name: null,
            url: null,
            dataStream: null,
            dataStreamContentType: null,
            id: null
        };
        if (vm.case.estimateLog) {
            vm.estimateLogs = vm.case.estimateLog.split('\n');
        }
        getCurrentUser()
        Updatetype.query(function(result){
            vm.updateTypes = result;
        })
        function capitalizeFirstLetter(string) {
            string = string.toLowerCase().replace('_', ' ');
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        function getCurrentUser(){
            Principal.identity().then(function(account) {
                if(vm.case.expertaccount.user.email == account.email){
                    vm.isExpert = true;
                } else {
                    vm.isExpert = false;
                }
            });
        }
        Caseupdate.query(function(result){
            result.reverse().forEach(function(update){
                if(update.supportcase.id === vm.case.id){
                    if(update.updatetype.id == 2){
                        vm.detailedResolutions.push(update);
                    }
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
            Attachment.save(vm.attachment);
        }
        function onSaveError (error){
        }
        function submit() {
            if (vm.attachment.name) {
                vm.caseupdate.updateMsg = vm.attachment.name + " Was uploaded. " + vm.updatemsg;
            } else {
                vm.caseupdate.updateMsg = vm.updatemsg;
            }
            if(!vm.updateType){
                vm.caseupdate.updatetype = {
                    id: 1
                }
            } else {
                vm.updateType = JSON.parse(vm.updateType);
                vm.caseupdate.updatetype = vm.updateType;
                if (vm.updateType.id == 2) {
                    vm.case.status.id = 4;
                    Supportcase.update(vm.case);
                }
            }
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

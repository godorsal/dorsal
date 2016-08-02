(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('AttachmentModalController', AttachmentModalController);

    AttachmentModalController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'User', 'Register', 'Principal', 'Attachment'];

    function AttachmentModalController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, User, Register, Principal, Attachment) {
        var vm = this;
        vm.cancel = cancel;
        vm.case = drslCase;
        vm.submit = submit;
        vm.attachment = {
            name: null,
            url: null,
            dataStream: null,
            dataStreamContentType: null,
            id: null
        };
        vm.modalType = "attachment";
        vm.savingFile = false;
        function submit() {
            if(vm.attachment.dataStream && vm.savingFile == false){
                $rootScope.$broadcast("savingFile")
                vm.savingFile = true;
                vm.attachment.supportcase = {
                    id: vm.case.id
                }
                Attachment.save(vm.attachment, onSaveSuccess, onSaveError);
            }
        }
        function onSaveSuccess(data){
            $rootScope.$broadcast("fileuploaded")
            vm.savingFile = false;
        }
        function onSaveError(error){
            console.log(error);
        }
        function cancel(e) {
            e.preventDefault();
            $uibModalInstance.dismiss('cancel');
        }
        Principal.identity().then(function (account) {
            vm.currentUser = account;
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachmentDialogController', AttachmentDialogController);

    AttachmentDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Attachment', 'Supportcase'];

    function AttachmentDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Attachment, Supportcase) {
        var vm = this;
        vm.attachment = entity;
        vm.supportcases = Supportcase.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('dorsalApp:attachmentUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.attachment.id !== null) {
                Attachment.update(vm.attachment, onSaveSuccess, onSaveError);
            } else {
                Attachment.save(vm.attachment, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.setDataStream = function ($file, attachment) {
            console.log("DATA STREAM HIT");
            if ($file) {
                console.log("FILE FOUND");
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        attachment.dataStream = base64Data;
                        attachment.dataStreamContentType = $file.type;
                    });
                });
            }
        };

        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
    }
})();

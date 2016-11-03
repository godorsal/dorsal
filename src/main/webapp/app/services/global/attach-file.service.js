(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslAttachFileService', DrslAttachFileService);

    DrslAttachFileService.$inject = ['Attachment', 'DataUtils', 'toastr', '$translate', 'DrslNewCaseService', '$rootScope', '$timeout', 'Caseupdate', 'Principal'];

    function DrslAttachFileService(Attachment, DataUtils, toastr, $translate, DrslNewCaseService, $rootScope, $timeout, Caseupdate, Principal) {
        var service = {};

        service.attachFileList = [];
        service.attachErrFileList = [];
        service.deleteFileList = [];
        service.caseupdate = {
            updatetype: {
                id: 1
            }
        };

        service.attachment = {
            name: null,
            url: null,
            dataStream: null,
            dataStreamContentType: null,
            id: null
        };
        service.uploading = false;
        service.uploadingToasr = null;

        function getCurrentUser() {
            Principal.identity().then(function (account) {
                service.caseupdate.user = account;
            });
        }

        /**
         * Set the attachFileList with the provided fileList.
         * @param fileList
         */
        service.setAttachFileList = function (fileList) {
            service.attachFileList = fileList;
        };

        /**
         * Set the attachErrFileList with the provided fileList.
         * @param fileList
         */
        service.setAttachErrFileList = function (fileList) {
            service.attachErrFileList = fileList;
        };

        /**
         * Sets both the attachFileList and the attachErrFileList
         * @param attachFileList
         * @param attachErrFileList
         */
        service.setAttachments = function (attachFileList, attachErrFileList) {
            service.setAttachFileList(attachFileList);
            service.setAttachErrFileList(attachErrFileList)
        };

        /**
         * Set the deleteFileList with the provided fileList.
         * @param fileList
         */
        service.setDeletions = function (fileList) {
            service.deleteFileList = fileList;
        };

        /**
         * Uploads any attachments remaining in the attachFileList and associates them with the provided supportCase
         * @param supportCase
         */
        service.uploadAttachFileList = function (supportCase) {
            if (!service.uploading && service.attachFileList.length) {
                service.uploading = true;
                service.uploadingToasr = toastr.info($translate.instant('global.messages.info.uploadingFiles', {fileCount: service.attachFileList.length.toString()}), {timeOut: 0});
                uploadFileInQueue(supportCase);
            }
        };

        /**
         * Delete files in the deleteFileList Queue
         * @param supportCase
         */
        service.deleteAttachments = function (supportCase) {
            angular.forEach(service.deleteFileList, function (file) {
                if (file.supportcase.id === supportCase.id) {
                    Attachment.delete({id: file.id});
                }
            });
            service.deleteFileList = [];
            service.broadcastAttachmentsRemoved();
        };

        /**
         * Broadcast an 'attachmentUploadComplete' event from the $rootScope
         */
        service.broadcastAttachmentUploadComplete = function (){
            $timeout(function(){
                $rootScope.$broadcast('attachmentUploadComplete');
            }, 1000);
        };
        /**
         * Broadcast an 'attachmentUploadComplete' event from the $rootScope
         */
        service.broadcastForAttachmentMessage = function (attachment){
            $timeout(function(){
                $rootScope.$broadcast('attachmentCompleteWriteUpdate', attachment);
            }, 1000);
        };

        /**
         * Broadcast an 'attachmentsRemoved' event from the $rootScope
         */
        service.broadcastAttachmentsRemoved = function (){
            $timeout(function(){
                $rootScope.$broadcast('attachmentsRemoved');
            }, 1000);
        };

        /**
         * Upload files in the attachFileList Queue
         * @param supportCase
         */
        function uploadFileInQueue(supportCase) {
            var file = service.attachFileList.shift(),
                caseId = (supportCase)? supportCase.id : DrslNewCaseService.newCaseId;

            if (file && !file.dataStream && caseId) {
                DataUtils.toBase64(file, function (base64Data) {
                    service.attachment.name = file.name.replace(/\s|,|-/g, '');
                    service.attachment.dataStream = base64Data;
                    service.attachment.dataStreamContentType = file.type;
                    service.attachment.supportcase = {
                        id: caseId
                    };
                    Attachment.save(service.attachment, function (file) {
                        // on success, proceed to the next file
                        // service.broadcastForAttachmentMessage(file);
                        getCurrentUser();
                        service.caseupdate.updateMsg = file.name + $translate.instant('global.messages.info.fileWasUploaded')
                        service.caseupdate.supportcase = supportCase;

                        Caseupdate.save(service.caseupdate, onSaveSuccess, onSaveError)
                        uploadFileInQueue(supportCase);
                    }, function () {
                        // on error, proceed to the next file
                        uploadFileInQueue(supportCase);
                        // TODO: add a toastr notification listing the files that failed to upload
                    });
                });
            } else {
                service.uploading = false;
                if (service.uploadingToasr) {
                    toastr.clear(service.uploadingToasr);
                    service.uploadingToasr = null;
                }
                toastr.success($translate.instant('global.messages.info.filesUploaded'));
                service.broadcastAttachmentUploadComplete();
            }
        }
        function onSaveSuccess(thing) {
            console.log(thing, "!");
        }
        function onSaveError(thing) {
            console.log(thing, "!");
        }

        return service;
    }
})();

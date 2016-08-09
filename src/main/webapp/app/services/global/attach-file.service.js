(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslAttachFileService', DrslAttachFileService);

    DrslAttachFileService.$inject = ['Attachment', 'DataUtils', 'toastr', '$translate'];

    function DrslAttachFileService(Attachment, DataUtils, toastr, $translate) {
        var service = {};

        service.attachFileList = [];
        service.attachErrFileList = [];
        service.attachment = {
            name: null,
            url: null,
            dataStream: null,
            dataStreamContentType: null,
            id: null
        };
        service.uploading = false;
        service.uploadingToasr = null;

        /**
         * Set the setAttachFileList with the provided fileList.
         * @param fileList
         */
        service.setAttachFileList = function (fileList) {
            service.attachFileList = fileList;
        };

        /**
         * Set the setAttachErrFileList with the provided fileList.
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
         * Upload files in the attachFileList Queue
         * @param supportCase
         */
        function uploadFileInQueue(supportCase) {
            var file = service.attachFileList.shift();

            if (file) {
                DataUtils.toBase64(file, function (base64Data) {
                    service.attachment.name = file.name.replace(/\s|,|-/g, '');
                    service.attachment.dataStream = base64Data;
                    service.attachment.dataStreamContentType = file.type;
                    service.attachment.supportcase = {
                        id: supportCase.id
                    };
                    Attachment.save(service.attachment, function () {
                        // on success, proceed to the next file
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
            }
        }

        return service;
    }
})();

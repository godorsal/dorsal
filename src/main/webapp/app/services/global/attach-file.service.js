(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslAttachFileService', DrslAttachFileService);

    DrslAttachFileService.$inject = ['Attachment'];

    function DrslAttachFileService(Attachment) {
        var service = {};

        service.attachFileList = [];
        service.attachErrFileList = [];

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
            console.log('supportCase: ' + supportCase.id);
            angular.forEach(service.attachFileList, function(file) {
                console.log(file);
            });
        };

        return service;
    }
})();

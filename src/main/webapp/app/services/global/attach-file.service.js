(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslAttachFileService', DrslAttachFileService);

    DrslAttachFileService.$inject = ['Attachment', 'DataUtils', 'toastr', '$rootScope'];

    function DrslAttachFileService(Attachment, DataUtils, toastr, $rootScope) {
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
            angular.forEach(service.attachFileList, function(file, index) {
              if(!service.uploading){
                uploadFile(file, supportCase)
                service.attachFileList.splice(index, 1);
              }
              });
            };
        function uploadFile(file, supportCase){
          service.uploading = true;
          DataUtils.toBase64(file, function(base64Data) {
              service.attachment.name = file.name.replace(/\s|,|-/g, '');
              service.attachment.dataStream = base64Data;
              service.attachment.dataStreamContentType = file.type;
              service.attachment.supportcase = {
                id: supportCase.id
              }
            Attachment.save(service.attachment, notifySaveSuccess, notifySaveFailure);
          });
        }
        function notifySaveSuccess(file){
          toastr.clear()
          if(service.attachFileList.length > 0){
            setTimeout(function(){
              var fileNum = service.attachFileList.length == 1 ? "File" : "Files";
                toastr["info"](fileNum + " Uploading", service.attachFileList.length.toString(), { timeOut: 0 })
            }, 6000)
          }
          toastr["success"](" was saved!", file.name, { newestOnTop: true, timeOut: 5000})
          service.uploading = false;
        }
        function notifySaveFailure(error){
          // console.log(error);
        }
        return service;
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('drslAttachFiles', drslAttachFiles);

    drslAttachFiles.$inject = ['DrslAttachFileService', 'Principal'];


    function drslAttachFiles(DrslAttachFileService, Principal) {
        var directive = {
            restrict: 'E',
            scope:  {
                'attachments': '='
            },
            templateUrl: 'app/components/form/attach-files.directive.html',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.attachmentsOpen = false;
            scope.attachFileList = [];
            scope.attachErrFileList = [];
            scope.isAuthenticated = Principal.isAuthenticated();

            /**
             * Close the Attachments dropdown on click of the 'Done' button and set the attachments in
             * the DrslAttachFileService
             */
            scope.closeAttachments = function () {
                scope.attachmentsOpen = false;
                DrslAttachFileService.setAttachments(scope.attachFileList, scope.attachErrFileList);
            };

            /**
             * Attach files to the local file list
             * @param files
             * @param errFiles
             */
            scope.attachFiles = function (files, errFiles) {
                scope.attachFileList = scope.attachFileList.concat(files);
                scope.attachErrFileList = scope.attachErrFileList.concat(errFiles);
                DrslAttachFileService.setAttachments(scope.attachFileList, scope.attachErrFileList);
            };

            /**
             * Remove files (by index) from the local file list
             * @param fileIndex
             */
            scope.removeAttachment = function (fileIndex) {
                scope.attachFileList.splice(fileIndex, 1);
            };
        }
    }
})();

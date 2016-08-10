(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('drslAttachFiles', drslAttachFiles);

    drslAttachFiles.$inject = ['DrslAttachFileService', 'Principal', '$sce', '$translate', 'Attachment'];


    function drslAttachFiles(DrslAttachFileService, Principal, $sce, $translate, Attachment) {
        var directive = {
            restrict: 'E',
            scope:  {
                'attachments': '=',
                'hideButtons': '@',
                'hideControls': '@',
                'hideTooltip': '@',
                'caseId': '@'
            },
            templateUrl: 'app/components/form/attach-files.directive.html',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.attachmentsOpen = false;
            scope.attachFileList = [];
            scope.attachErrFileList = [];
            scope.isAuthenticated = Principal.isAuthenticated;
            scope.attachmentMessageLoggedIn = $sce.trustAsHtml($translate.instant('global.messages.info.attachmentMessageLoggedIn'));
            scope.attachmentMessageLoggedOut = $sce.trustAsHtml($translate.instant('global.messages.info.attachmentMessageLoggedOut'));

            /**
             * Opens the Attachments dropdown.
             * @param event
             */
            scope.openAttachments = function(event) {
                if (scope.isAuthenticated()) {
                    scope.attachmentsOpen = !scope.attachmentsOpen;
                } else {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };

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

            /**
             * Get Case Attachments via rest call
             */
            scope.getCaseAttachments = function () {
                Attachment.query(function(result){
                    scope.attachFileList = [];

                    result.reverse().forEach(function(attachment){
                        if(attachment.supportcase.id == scope.caseId){
                            scope.attachFileList.push(attachment);
                        }
                    })
                })
            };

            // If we have a case id, listen for events that may require another rest call
            scope.$on('currentCaseSet', function(){
                if (scope.caseId) {
                    scope.getCaseAttachments();
                }
            });

            scope.$on('attachmentUploadComplete', function(){
                if (scope.caseId) {
                    scope.getCaseAttachments();
                }
            });
        }
    }
})();

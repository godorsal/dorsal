(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('drslAttachFiles', drslAttachFiles);

    drslAttachFiles.$inject = ['DrslAttachFileService', 'Principal', '$sce', '$translate', 'Attachment', 'DataUtils', 'DrslBrowserDetectService', '$document'];


    function drslAttachFiles(DrslAttachFileService, Principal, $sce, $translate, Attachment, DataUtils, DrslBrowserDetectService, $document) {
        var directive = {
            restrict: 'E',
            scope:  {
                'attachments': '=',
                'displayType': '@',
                'autoClose': '@',
                'addOnAttach': '@',
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
            scope.pendingAttachments = [];
            scope.pending = false;
            scope.attachmentsOpen = false;
            scope.attachFileList = [];
            scope.attachErrFileList = [];
            scope.deleteFileList = [];
            scope.isAuthenticated = Principal.isAuthenticated;
            scope.attachmentMessageLoggedIn = $sce.trustAsHtml($translate.instant('global.messages.info.attachmentMessageLoggedIn'));
            scope.attachmentMessageLoggedOut = $sce.trustAsHtml($translate.instant('global.messages.info.attachmentMessageLoggedOut'));
            scope.isNotMS = DrslBrowserDetectService.isNotMS;

            /**
             * Opens the Attachments dropdown.
             * @param event
             */
            scope.openAttachments = function(event) {
                event.stopPropagation();
                event.preventDefault();
                if (scope.isAuthenticated()) {
                    scope.attachmentsOpen = !scope.attachmentsOpen;
                    scope.littleModalOpen = true;
                }
            };

            /**
             * Close the Attachments dropdown on click of the 'Done' button and set the attachments in
             * the DrslAttachFileService
             */
            scope.closeAttachments = function () {
                scope.attachmentsOpen = false;
            };

            /**
             * Attach files to the local file list
             * @param files
             * @param errFiles
             */
            scope.attachFiles = function (files, errFiles) {
                scope.attachFileList = scope.attachFileList.concat(files);
                scope.attachErrFileList = scope.attachErrFileList.concat(errFiles);
                scope.pendingAttachments = files;

                if (scope.addOnAttach === 'true') {
                    scope.updateService();
                }
            };

            /**
             * Remove files (by index) from the local file list
             * @param fileIndex
             */
            scope.removeAttachment = function (fileIndex) {
                var file = scope.attachFileList[fileIndex];

                if (file.dataStream) {
                    scope.deleteFileList.push(file);
                }

                scope.attachFileList.splice(fileIndex, 1);

                if (scope.addOnAttach === 'true') {
                    scope.updateService();
                }
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
            /**
             * On ESCAPE key press, run cancelAttachments function
             */
            $document.keyup(function(e) {
                 if (e.keyCode == 27) {
                     if(!scope.littleModalOpen){
                         scope.cancelAttachments ()
                     } else {
                         scope.closeAttachments();
                     }
                }
                scope.$apply();
            });
            /**
             * Cancel attachments, clears local and service file lists
             */
            scope.cancelAttachments = function () {
                if(scope.pendingAttachments.length && scope.pending == false){
                    scope.pending = true;
                    scope.$emit('pendingAttachments', scope.pendingAttachments);
                } else {
                    scope.pending = false;
                    scope.attachFileList = [];
                    scope.attachErrFileList = [];
                    scope.deleteFileList = [];
                    DrslAttachFileService.setAttachments(scope.attachFileList, scope.attachErrFileList);
                    DrslAttachFileService.setDeletions(scope.deleteFileList);

                    scope.closeAttachments();
                    scope.$emit('cancelAttachments');
                }
            };

            /**
             * Sets the attachments in the service and calls processes to close the views.
             */
            scope.doneWithAttachments = function () {
                scope.pending = false;
                scope.updateService();
                scope.closeAttachments();
                scope.$emit('doneWithAttachments');
            };

            /**
             * Update the DrslAttachFileService with the local changes.
             */
            scope.updateService = function() {
                var attachFileList = scope.attachFileList.filter(function (file) {
                    return !file.dataStream
                });

                DrslAttachFileService.setAttachments(attachFileList, scope.attachErrFileList);
                DrslAttachFileService.setDeletions(scope.deleteFileList);
            };

            /**
             * Views the attachment by calling DataUtils' openFile method.
             * @param attachment
             */
            scope.viewAttachment = function(attachment){
                DataUtils.openFile(attachment.dataStreamContentType, attachment.dataStream);
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

            scope.$on('attachmentsRemoved', function(){
                if (scope.caseId) {
                    scope.getCaseAttachments();
                }
            });
        }
    }
})();

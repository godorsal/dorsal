(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .directive('fileUpload', fileUpload);

    function fileUpload() {
        var controller = ['$timeout', '$scope', '$stateParams', 'DataUtils', 'Attachment', 'Supportcase', 'Caseupdate', '$rootScope', function($timeout, $scope, $stateParams, DataUtils, Attachment, Supportcase, Caseupdate, $rootScope){
            var vm = this;
            $scope.filesToDelete = [];
            $scope.attachments = [];
            $scope.getAttachments = function(){
                $scope.attachment = {};
                Attachment.query(function(result){
                    $scope.attachments = [];
                    $scope.savingFile = false;
                    result.reverse().forEach(function(attachment){
                        if(attachment.supportcase.id === $scope.currentcase){
                            $scope.attachments.push(attachment)
                        }
                    })
                })
            }
            $scope.getAttachments();
            $scope.download = function(){
                // window.open(stream)
            }
            $rootScope.$on("fileuploaded", function(){
                $scope.getAttachments();
            })
            $rootScope.$on("savingFile", function(){
                $scope.savingFile = true;
            })
            $scope.addToDelete = function(attachment){
                $scope.filesToDelete.push(attachment);
            }
            $scope.deleteItems = function(attachment, index){
                Attachment.delete({id: attachment.id})
                $scope.attachments.splice(index, 1)
            }
            $scope.setDataStream = function ($file, attachment) {
                if ($file) {
                    console.log($file);
                    $scope.loadingFile = true;
                    DataUtils.toBase64($file, function(base64Data) {
                        $scope.$apply(function() {
                            $scope.attachment.name = $file.name.replace(/\s|,|-/g, '');
                            $scope.attachment.dataStream = base64Data;
                            $scope.attachment.dataStreamContentType = $file.type;
                            $scope.loadingFile = false;
                        });
                    });
                }
            };
            $scope.deleteAttachment = function (attachment, index) {
                Attachment.delete({id: attachment.id})
                $scope.attachments.splice(index, 1)
                var deleteUpdate = {
                    supportcase: {
                        id: $scope.currentcase
                    },
                    updatetype: {
                        id: 1
                    },
                    updateMsg: attachment.name + 'was deleted.'
                }
                Caseupdate.save(deleteUpdate);
            }
            $scope.openFile = DataUtils.openFile;
            $scope.byteSize = DataUtils.byteSize;
        }]
        var directive = {
            restrict: 'E',
            scope: {
                attachment: '=',
                currentcase: '=',
                modalType: '='
            },
            controller: controller,
            template: '<div class="caseDetailsFileList" ng-if="modalType != \'attachment\'">' + '<li ng-repeat="attachment in attachments track by $index"  class="attachmentItem" ng-click="options = !options">' +
            '<div class="name">{{attachment.name}}' + '</div>' +
            '<div class="options" ng-if="options">' +
            '<a ng-click="openFile(attachment.dataStreamContentType, attachment.dataStream); $event.stopPropagation();">' +
            'view' +
            '</a>' +
            '<a ng-click="$event.stopPropagation();" href="data:application/octet-stream;charset=utf-16le;base64,{{attachment.dataStream}}" download="{{attachment.name}}">' +
            'download' +

            '</a>' +
            '<a ng-click="deleteAttachment(attachment, $index)">' +
            'delete' +

            '</a>' +
            '</div>' +
            '</li>'
            + '</div>'
            + '<br />'
            + '<h4 ng-if="loadingFile" class="saveload">Loading File...</h4>'
            + '<h4 ng-if="savingFile" class="saveload">Saving File...</h4>'
            + '<br />'
            + '<div class="drsl-file-upload-component" class="form-group" ng-class="{\'drsl-file-upload-component-attachment\': modalType == \'attachment\'}" type="file" ngf-select ngf-change="setDataStream($file, attachment)" class="uploadLink">'
            + '{{attachment.name}}'
            + '<img data-ng-src="data:image/png;base64,{{attachment.dataStream}}" alt="" class="thumbnail" ng-if="attachment.dataStreamContentType.split(\'/\')[0] == \'image\'">'
            + '<img src="http://neowin.s3.amazonaws.com/forum/uploads/monthly_04_2013/post-360412-0-09676400-1365986245.png" class="placeholderIcon" alt="" ng-if="attachment.dataStreamContentType.split(\'/\')[0] !== \'image\' && attachment.dataStreamContentType">'
            +'<span ng-if="modalType != \'attachment\'">'
            + '<i class="fa fa-cloud-upload fa-lg" class="cloudIcon"></i>'
            + '<span type="file" ngf-select ngf-change="setDataStream($file, attachment)" class="uploadLink">{{"global.form.fileupload.browse" | translate}}</span>'
            +'</span>'
            +'<span ng-if="modalType == \'attachment\'" class="attachmentModalInput">'
            + '<i class="fa fa-cloud-upload fa-lg" ></i>'
            + '<br />'
            + '<span>Click here to select files, or drag and drop them here</span>'
            + '<br />'
            + '<strong>The more we know about your case, the better we can serve you!</strong>'
            +'</span>'
            + '</div>'
            + '<br />'
            + '<span ng-if="modalType == \'attachment\' && loadingFiles">Loading Files</span>'
            + '<table class="table-striped scroll attachmentModalTable" ng-if="modalType == \'attachment\'" >'
            + '<thead>'
            + '<tr>'
            + '<th>Manage attached files</th>'
            + '<th>Remove</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody>'
            + '<tr ng-repeat="attachment in attachments track by $index">'
            + '<td>{{attachment.name}}</td>'
            + '<td><i class="glyphicon glyphicon-trash" ng-click="deleteItems(attachment, $index)"></i></td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
        };

        return directive;
    }
})();

(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .directive('fileUpload', fileUpload);

    function fileUpload() {
        var controller = ['$timeout', '$scope', '$stateParams', 'DataUtils', 'Attachment', 'Supportcase', 'Caseupdate', '$rootScope', function($timeout, $scope, $stateParams, DataUtils, Attachment, Supportcase, Caseupdate, $rootScope){
            var vm = this;
            console.log($scope.modalType);
            $scope.filesToDelete = [];
            $scope.getAttachments = function(){
                $scope.attachment = {};
                Attachment.query(function(result){
                    $scope.attachments = [];
                    result.reverse().forEach(function(attachment){
                        if(attachment.supportcase.id === $scope.currentcase){
                            $scope.attachments.push(attachment)
                            console.log($scope.attachments);
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
            $scope.addToDelete = function(attachment){
                $scope.filesToDelete.push(attachment);
            }
            $scope.deleteItems = function(attachment, index){
                // $scope.filesToDelete.forEach(function(dAttachment){
                    Attachment.delete({id: attachment.id})
                    $scope.attachments.splice(index, 1)
                // })
            }
            $scope.setDataStream = function ($file, attachment) {
                if ($file) {
                    DataUtils.toBase64($file, function(base64Data) {
                        $scope.$apply(function() {
                            $scope.attachment.name = $file.name.replace(/\s|,|-/g, '');
                            $scope.attachment.dataStream = base64Data;
                            $scope.attachment.dataStreamContentType = $file.type;
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
            template: '<div style="overflow-y: auto; max-height: 58px;" ng-if="modalType != \'attachment\'">' + '<li ng-repeat="attachment in attachments track by $index" style="outline: none; display: block;" class="attachmentItem" ng-click="options = !options">' +
            '<div style="display: inline-block;">{{attachment.name}}' + '</div>' +
            '<div style="display: inline-block; margin-left: 10px;" ng-if="options">' +
            '<a ng-click="openFile(attachment.dataStreamContentType, attachment.dataStream); $event.stopPropagation();" style="font-size: 14px; margin-right: 7px;">' +
            'view' +
            '</a>' +
            '<a ng-click="$event.stopPropagation();" href="data:application/octet-stream;charset=utf-16le;base64,{{attachment.dataStream}}" download="{{attachment.name}}" style="font-size: 14px; margin-right: 7px;">' +
            'download' +

            '</a>' +
            '<a ng-click="deleteAttachment(attachment, $index)" style="font-size: 14px; margin-right: 7px;">' +
            'delete' +

            '</a>' +
            '</div>' +
            '</li>'
            + '</div>'
            + '<br />'
            + '<div class="drsl-file-upload-component" class="form-group">'
            + '{{attachment.name}}'
            + '<img data-ng-src="data:image/png;base64,{{attachment.dataStream}}" alt="" style="width: 150px;max-height: 103px;" ng-if="attachment.dataStreamContentType.split(\'/\')[0] == \'image\'">'
            + '<img src="http://neowin.s3.amazonaws.com/forum/uploads/monthly_04_2013/post-360412-0-09676400-1365986245.png" style="width: 100px;" alt="" ng-if="attachment.dataStreamContentType.split(\'/\')[0] !== \'image\' && attachment.dataStreamContentType">'
            +'<span ng-if="modalType != \'attachment\'">'
            + '<i class="fa fa-cloud-upload fa-lg" style="margin-right: 5px;"></i>'
            + '<span type="file" ngf-select ngf-change="setDataStream($file, attachment)" class="uploadLink">{{"global.form.fileupload.browse" | translate}}</span>'
            +'</span>'
            +'<span ng-if="modalType == \'attachment\'" style="color: black;">'
            + '<i class="fa fa-cloud-upload fa-lg" style="margin-right: 5px;"></i>'
            + '<br />'
            + '<span type="file" ngf-select ngf-change="setDataStream($file, attachment)" class="uploadLink">Click here to select files, or drag and drop them here</span>'
            + '<br />'
            + '<strong>The more we know about your case, the better we can serve you!</strong>'
            +'</span>'
            + '</div>'
            + '<br />'
            + '<table class="table-striped" ng-if="modalType == \'attachment\'"style="width: 570px;">'
            + '<thead>'
            + '<tr>'
            + '<th >Manage attached files</th>'
            + '<th>Remove</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody style="border: 1px solid #999999;">'
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

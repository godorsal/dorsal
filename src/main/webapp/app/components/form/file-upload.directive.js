(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('fileUpload', fileUpload);

    function fileUpload() {
        var controller = ['$timeout', '$scope', '$stateParams', 'DataUtils', 'Attachment', 'Supportcase', 'Caseupdate', function($timeout, $scope, $stateParams, DataUtils, Attachment, Supportcase, Caseupdate){
            var vm = this;
            $scope.attachments = [];
            Attachment.query(function(result){
                result.reverse().forEach(function(attachment){
                    if(attachment.supportcase.id === $scope.currentcase){
                        $scope.attachments.push(attachment)
                    }
                })
            })
            $scope.download = function(){
                // window.open(stream)
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
                currentcase: '='
            },
            controller: controller,
            template: '<div style="overflow-y: scroll; max-height: 58px;">' + '<li ng-repeat="attachment in attachments track by $index" style="outline: none; display: block;" class="attachmentItem" ng-click="options = !options">' +
            '<div style="display: inline-block;">{{attachment.name}}' + '</div>' +
            '<div style="display: inline-block; margin-left: 10px;" ng-if="options">' +
            // '<div uib-tooltip="{{attachment.name}}" style="display: inline-block;">{{attachment.name.substring(0, 10)}}' + '<span ng-if="attachment.name.length > 10">...</span>' + '</div>' + '<div style="display: inline-block;" ng-if="options">' +
            '<a ng-click="openFile(attachment.dataStreamContentType, attachment.dataStream); $event.stopPropagation();" style="font-size: 14px; margin-right: 7px;">' +
            // '<i class="fa fa-search fa-lg" aria-hidden="true"></i>' +
            'view' +
            '</a>' +
            '<a ng-click="$event.stopPropagation();" href="data:application/octet-stream;charset=utf-16le;base64,{{attachment.dataStream}}" download="{{attachment.name}}" style="font-size: 14px; margin-right: 7px;">' +
            // '<i class="fa fa-download fa-lg" aria-hidden="true"></i>' +
            'download' +

            '</a>' +
            '<a ng-click="deleteAttachment(attachment, $index)" style="font-size: 14px; margin-right: 7px;">' +
            // '<i class="fa fa-times-circle" aria-hidden="true"></i>' +
            'delete' +

            '</a>' +
            '</div>' +
            // '<img data-ng-src="data:image/png;base64,{{attachment.dataStream}}" alt="" style="width: 75px;max-height: 50px;" ng-if="attachment.dataStreamContentType.split(\'/\')[0] == \'image\'">' +
            // '<img src="http://neowin.s3.amazonaws.com/forum/uploads/monthly_04_2013/post-360412-0-09676400-1365986245.png" style="width: 50px; height: 45px;" alt="" ng-if="attachment.dataStreamContentType.split(\'/\')[0] !== \'image\' && attachment.dataStreamContentType">'
            '</li>'
            + '</div>'
            + '<div class="drsl-file-upload-component" class="form-group">'
            + '{{attachment.name}}'
            + '<img data-ng-src="data:image/png;base64,{{attachment.dataStream}}" alt="" style="width: 150px;max-height: 103px;" ng-if="attachment.dataStreamContentType.split(\'/\')[0] == \'image\'">'
            + '<img src="http://neowin.s3.amazonaws.com/forum/uploads/monthly_04_2013/post-360412-0-09676400-1365986245.png" style="width: 100px;" alt="" ng-if="attachment.dataStreamContentType.split(\'/\')[0] !== \'image\' && attachment.dataStreamContentType">'
            + '<i class="fa fa-cloud-upload fa-lg" style="margin-right: 5px;"></i>'
            + '<span type="file" ngf-select ngf-change="setDataStream($file, attachment)" class="uploadLink">{{"global.form.fileupload.browse" | translate}}</span>'
            + '</div>'
        };

        return directive;
    }
})();

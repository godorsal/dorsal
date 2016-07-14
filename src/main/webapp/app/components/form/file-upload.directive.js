(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('fileUpload', fileUpload);

    function fileUpload() {
        var controller = ['$timeout', '$scope', '$stateParams', 'DataUtils', 'Attachment', 'Supportcase', function($timeout, $scope, $stateParams, DataUtils, Attachment, Supportcase){
            var vm = this;
            $scope.attachments = [];
            Attachment.query(function(result){
                result.reverse().forEach(function(attachment){
                    if(attachment.supportcase.id === $scope.currentcase){
                        $scope.attachments.push(attachment)
                        console.log($scope.attachments);
                    }
                })
            })
            $scope.download = function(){
                console.log("HELLLLLO?");
                // console.log(stream);
                // window.open(stream)
            }
            $scope.setDataStream = function ($file, attachment) {
                if ($file) {
                    DataUtils.toBase64($file, function(base64Data) {
                        $scope.$apply(function() {
                            $scope.attachment.name = $file.name.replace(/\s|,|-/g, '');
                            $scope.attachment.dataStream = base64Data;
                            $scope.attachment.dataStreamContentType = $file.type;
                            console.log("ATTACCHMENT", $scope.attachment);
                        });
                    });
                }
            };
            $scope.deleteAttachment = function (attachment, index) {
                Attachment.delete({id: attachment.id})
                $scope.attachments.splice(index, 1)
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
            template: '<div style="overflow-y: scroll; max-height: 318px;">' + '<div ng-repeat="attachment in attachments track by $index" style="display: inline-block;" class="attachmentItem">' +
            '<div uib-tooltip="{{attachment.name}}">{{attachment.name.substring(0, 10)}}' + '<span ng-if="attachment.name.length > 10">...</span>' + '</div>' +
            '<a ng-click="openFile(attachment.dataStreamContentType, attachment.dataStream)" style="font-size: 20px;">' +
            '<i class="fa fa-search fa-lg" aria-hidden="true"></i>' +
            '</a>' +
            '<a href="data:application/octet-stream;charset=utf-16le;base64,{{attachment.dataStream}}" download="{{attachment.name}}" style="font-size: 20px;">' +
            '<i class="fa fa-download fa-lg" aria-hidden="true"></i>' +
            '</a>' +
            '<a ng-click="deleteAttachment(attachment, $index)" style="font-size: 25px;">' +
            '<i class="fa fa-times-circle" aria-hidden="true"></i>' +
            '</a>' +
            '<br>' +
            '<img data-ng-src="data:image/png;base64,{{attachment.dataStream}}" alt="" style="width: 75px;max-height: 50px;" ng-if="attachment.dataStreamContentType.split(\'/\')[0] == \'image\'">' +
            '<img src="http://neowin.s3.amazonaws.com/forum/uploads/monthly_04_2013/post-360412-0-09676400-1365986245.png" style="width: 50px; height: 45px;" alt="" ng-if="attachment.dataStreamContentType.split(\'/\')[0] !== \'image\' && attachment.dataStreamContentType">'
            + '</div>'
            + '</div>'
            + '<div class="drsl-file-upload-component" class="form-group">'
            + '{{attachment.name}}'
            + '<img data-ng-src="data:image/png;base64,{{attachment.dataStream}}" alt="" style="width: 150px;max-height: 103px;" ng-if="attachment.dataStreamContentType.split(\'/\')[0] == \'image\'">'
            + '<img src="http://neowin.s3.amazonaws.com/forum/uploads/monthly_04_2013/post-360412-0-09676400-1365986245.png" style="width: 100px;" alt="" ng-if="attachment.dataStreamContentType.split(\'/\')[0] !== \'image\' && attachment.dataStreamContentType">'
            + '<i class="fa fa-cloud-upload fa-lg"></i>'
            + '{{"global.form.fileupload.drop" | translate}}'
            + '<span type="file" ngf-select ngf-change="setDataStream($file, attachment)">{{"global.form.fileupload.browse" | translate}}</span>'
            + '</div>'
        };

        return directive;
    }
})();

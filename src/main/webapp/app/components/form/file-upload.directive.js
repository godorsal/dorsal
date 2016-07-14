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
            $scope.setDataStream = function ($file, attachment) {
                if ($file) {
                    DataUtils.toBase64($file, function(base64Data) {
                        $scope.$apply(function() {
                            $scope.attachment.name = $file.name;
                            $scope.attachment.dataStream = base64Data;
                            $scope.attachment.dataStreamContentType = $file.type;
                            console.log("ATTACCHMENT", $scope.attachment);
                        });
                    });
                }
            };
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
            template: '<div ng-repeat="attachment in attachments" style="padding-bottom: 20px; display: inline-block;">{{attachment.name}}' +
            '<br>' +
            '{{attachment.dataStreamContentType}}' +
            '<a class="pull-left" ng-click="openFile(attachment.dataStreamContentType, attachment.dataStream)">' +
            '<img data-ng-src="data:image/png;base64,{{attachment.dataStream}}" alt="" style="width: 100px;" ng-if="attachment.dataStreamContentType.split(\'/\')[0] == \'image\'">' +
            '<img src="http://neowin.s3.amazonaws.com/forum/uploads/monthly_04_2013/post-360412-0-09676400-1365986245.png" style="width: 100px;" alt="" ng-if="attachment.dataStreamContentType.split(\'/\')[0] !== \'image\' && attachment.dataStreamContentType">'
            + '</a>'
            + '</div>'
            + '<div class="drsl-file-upload-component" class="form-group">'
            + '{{attachment.name}}'
            + '<img data-ng-src="data:image/png;base64,{{attachment.dataStream}}" alt="" style="width: 100px;" ng-if="attachment.dataStreamContentType.split(\'/\')[0] == \'image\'">'
            + '<img src="http://neowin.s3.amazonaws.com/forum/uploads/monthly_04_2013/post-360412-0-09676400-1365986245.png" style="width: 100px;" alt="" ng-if="attachment.dataStreamContentType.split(\'/\')[0] !== \'image\' && attachment.dataStreamContentType">'
            + '<i class="fa fa-cloud-upload fa-lg"></i>'
            + '{{"global.form.fileupload.drop" | translate}}'
            + '<span type="file" ngf-select ngf-change="setDataStream($file, attachment)">{{"global.form.fileupload.browse" | translate}}</span>'
            + '</div>'
        };

        return directive;
    }
})();

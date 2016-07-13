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
                    }
                })
            })
            $scope.setDataStream = function ($file, attachment) {
                if ($file) {
                    DataUtils.toBase64($file, function(base64Data) {
                        $scope.$apply(function() {
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
            templateUrl: '/app/components/form/file-upload.html'
        };

        return directive;
    }
})();

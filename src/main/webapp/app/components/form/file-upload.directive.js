(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('fileUpload', fileUpload);

    function fileUpload() {
        var controller = ['$timeout', '$scope', '$stateParams', 'DataUtils', 'Attachment', 'Supportcase', function($timeout, $scope, $stateParams, DataUtils, Attachment, Supportcase){
            var vm = this;
            $scope.attachment = {
                name: null,
                url: null,
                dataStream: null,
                dataStreamContentType: null,
                id: null
            };
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
        }]
        var directive = {
            restrict: 'E',
            scope: {},
            controller: controller,
            templateUrl: '/app/components/form/file-upload.html'
        };

        return directive;
    }
})();

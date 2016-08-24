(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('drslDownloadFile', drslDownloadFile);

    drslDownloadFile.$inject = ['$translate', 'DrslBrowserDetectService'];

    function drslDownloadFile ($translate, DrslBrowserDetectService) {
        var directive = {
            restrict: 'E',
            scope: {
                'file': '='
            },
            template: '<a ng-show="file.dataStream" class="drsl-attachment-control" ng-href="{{ \'data:application/octet-stream;charset=utf-16le;base64,\' + file.dataStream }}" download="{{file.name}}" ng-click="downloadFile($event)">{{linkText}}</a>',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope) {
            scope.linkText = '';

            // Use different link text for MS browsers and non MS browsers
            if (DrslBrowserDetectService.isNotMS) {
                scope.linkText = $translate.instant('entity.action.download');
            } else {
                scope.linkText = $translate.instant('entity.action.downloadOrView');
            }

            /**
             * Downloads files for IE, other browsers are just allowed to pass through.
             * @param event
             */
            scope.downloadFile = function(event) {
                event.stopPropagation();

                if (DrslBrowserDetectService.isIE || DrslBrowserDetectService.isEdge) {
                    event.preventDefault();
                    window.navigator.msSaveOrOpenBlob(base64toBlob(scope.file.dataStream, scope.file.dataStreamContentType), scope.file.name);
                }
            }
        }

        /**
         * Converts Base64 data into a Blob.
         * @param b64Data
         * @param contentType
         * @returns {Blob}
         */
        function base64toBlob(b64Data, contentType) {
            contentType = contentType || '';

            var byteCharacters = atob(b64Data),
                sliceSize = 512,
                byteArrays = [],
                offset, slice, byteNumbers, i, byteArray, blob;

            for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                slice = byteCharacters.slice(offset, offset + sliceSize);
                byteNumbers = new Array(slice.length);

                for (i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            blob = new Blob(byteArrays, {type: contentType});

            return blob;
        }
    }
})();

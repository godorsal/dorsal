(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .directive('fileUpload', fileUpload);

    function fileUpload() {
        var directive = {
            restrict: 'E',
            scope: {},
            template:   '<div class="drsl-file-upload-component">' +
                            '<i class="fa fa-cloud-upload fa-lg"></i> ' +
                            '{{"global.form.fileupload.drop" | translate}}' +
                            '<span type="file" ngf-select ngf-change="vm.setDataStream($file, vm.attachment)">{{"global.form.fileupload.browse" | translate}}</span>' +
                        '</div>'
        };

        return directive;
    }
})();

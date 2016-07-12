(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachmentController', AttachmentController);

    AttachmentController.$inject = ['$scope', '$state', 'DataUtils', 'Attachment'];

    function AttachmentController ($scope, $state, DataUtils, Attachment) {
        var vm = this;
        vm.attachments = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.loadAll = function() {
            Attachment.query(function(result) {
                vm.attachments = result;
            });
        };

        vm.loadAll();
        
    }
})();

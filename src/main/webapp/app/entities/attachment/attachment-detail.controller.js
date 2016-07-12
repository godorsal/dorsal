(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachmentDetailController', AttachmentDetailController);

    AttachmentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Attachment', 'Supportcase'];

    function AttachmentDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Attachment, Supportcase) {
        var vm = this;
        vm.attachment = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:attachmentUpdate', function(event, result) {
            vm.attachment = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();

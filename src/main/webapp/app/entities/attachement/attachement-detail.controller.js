(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachementDetailController', AttachementDetailController);

    AttachementDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Attachement', 'Supportcase'];

    function AttachementDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Attachement, Supportcase) {
        var vm = this;
        vm.attachement = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:attachementUpdate', function(event, result) {
            vm.attachement = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
    }
})();

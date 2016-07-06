(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('GlobalMetadataDetailController', GlobalMetadataDetailController);

    GlobalMetadataDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'GlobalMetadata'];

    function GlobalMetadataDetailController($scope, $rootScope, $stateParams, entity, GlobalMetadata) {
        var vm = this;
        vm.globalMetadata = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:globalMetadataUpdate', function(event, result) {
            vm.globalMetadata = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

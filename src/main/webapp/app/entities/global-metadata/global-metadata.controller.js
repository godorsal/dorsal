(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('GlobalMetadataController', GlobalMetadataController);

    GlobalMetadataController.$inject = ['$scope', '$state', 'GlobalMetadata'];

    function GlobalMetadataController ($scope, $state, GlobalMetadata) {
        var vm = this;
        vm.globalMetadata = [];
        vm.loadAll = function() {
            GlobalMetadata.query(function(result) {
                vm.globalMetadata = result;
            });
        };

        vm.loadAll();
        
    }
})();

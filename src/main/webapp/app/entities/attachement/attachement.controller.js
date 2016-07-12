(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachementController', AttachementController);

    AttachementController.$inject = ['$scope', '$state', 'DataUtils', 'Attachement'];

    function AttachementController ($scope, $state, DataUtils, Attachement) {
        var vm = this;
        vm.attachements = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
        vm.loadAll = function() {
            Attachement.query(function(result) {
                vm.attachements = result;
            });
        };

        vm.loadAll();
        
    }
})();

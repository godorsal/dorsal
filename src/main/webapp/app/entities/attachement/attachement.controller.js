(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('AttachementController', AttachementController);

    AttachementController.$inject = ['$scope', '$state', 'Attachement'];

    function AttachementController ($scope, $state, Attachement) {
        var vm = this;
        vm.attachements = [];
        vm.loadAll = function() {
            Attachement.query(function(result) {
                vm.attachements = result;
            });
        };

        vm.loadAll();
        
    }
})();

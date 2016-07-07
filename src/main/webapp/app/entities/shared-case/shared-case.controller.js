(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SharedCaseController', SharedCaseController);

    SharedCaseController.$inject = ['$scope', '$state', 'SharedCase'];

    function SharedCaseController ($scope, $state, SharedCase) {
        var vm = this;
        vm.sharedCases = [];
        vm.loadAll = function() {
            SharedCase.query(function(result) {
                vm.sharedCases = result;
            });
        };

        vm.loadAll();
        
    }
})();

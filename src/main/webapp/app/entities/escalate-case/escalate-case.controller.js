(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('EscalateCaseController', EscalateCaseController);

    EscalateCaseController.$inject = ['$scope', '$state', 'EscalateCase'];

    function EscalateCaseController ($scope, $state, EscalateCase) {
        var vm = this;
        vm.escalateCases = [];
        vm.loadAll = function() {
            EscalateCase.query(function(result) {
                vm.escalateCases = result;
            });
        };

        vm.loadAll();
        
    }
})();

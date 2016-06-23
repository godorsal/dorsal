(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ReferencedocController', ReferencedocController);

    ReferencedocController.$inject = ['$scope', '$state', 'Referencedoc'];

    function ReferencedocController ($scope, $state, Referencedoc) {
        var vm = this;
        vm.referencedocs = [];
        vm.loadAll = function() {
            Referencedoc.query(function(result) {
                vm.referencedocs = result;
            });
        };

        vm.loadAll();
        
    }
})();

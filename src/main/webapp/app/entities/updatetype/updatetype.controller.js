(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UpdatetypeController', UpdatetypeController);

    UpdatetypeController.$inject = ['$scope', '$state', 'Updatetype'];

    function UpdatetypeController ($scope, $state, Updatetype) {
        var vm = this;
        vm.updatetypes = [];
        vm.loadAll = function() {
            Updatetype.query(function(result) {
                vm.updatetypes = result;
            });
        };

        vm.loadAll();
        
    }
})();

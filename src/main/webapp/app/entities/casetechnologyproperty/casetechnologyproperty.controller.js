(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CasetechnologypropertyController', CasetechnologypropertyController);

    CasetechnologypropertyController.$inject = ['$scope', '$state', 'Casetechnologyproperty'];

    function CasetechnologypropertyController ($scope, $state, Casetechnologyproperty) {
        var vm = this;
        vm.casetechnologyproperties = [];
        vm.loadAll = function() {
            Casetechnologyproperty.query(function(result) {
                vm.casetechnologyproperties = result;
            });
        };

        vm.loadAll();

    }
})();

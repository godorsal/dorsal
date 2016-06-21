(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologypropertyController', TechnologypropertyController);

    TechnologypropertyController.$inject = ['$scope', '$state', 'Technologyproperty'];

    function TechnologypropertyController ($scope, $state, Technologyproperty) {
        var vm = this;
        vm.technologyproperties = [];
        vm.loadAll = function() {
            Technologyproperty.query(function(result) {
                vm.technologyproperties = result;
            });
        };

        vm.loadAll();
        
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologypropertyvalueController', TechnologypropertyvalueController);

    TechnologypropertyvalueController.$inject = ['$scope', '$state', 'Technologypropertyvalue'];

    function TechnologypropertyvalueController ($scope, $state, Technologypropertyvalue) {
        var vm = this;
        vm.technologypropertyvalues = [];
        vm.loadAll = function() {
            Technologypropertyvalue.query(function(result) {
                vm.technologypropertyvalues = result;
            });
        };

        vm.loadAll();
        
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyController', TechnologyController);

    TechnologyController.$inject = ['$scope', '$state', 'Technology'];

    function TechnologyController ($scope, $state, Technology) {
        var vm = this;
        vm.technologies = [];
        vm.loadAll = function() {
            Technology.query(function(result) {
                vm.technologies = result;
            });
        };

        vm.loadAll();
        
    }
})();

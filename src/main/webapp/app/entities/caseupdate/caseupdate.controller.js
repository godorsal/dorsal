(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseupdateController', CaseupdateController);

    CaseupdateController.$inject = ['$scope', '$state', 'Caseupdate'];

    function CaseupdateController ($scope, $state, Caseupdate) {
        var vm = this;
        vm.caseupdates = [];
        vm.loadAll = function() {
            Caseupdate.query(function(result) {
                vm.caseupdates = result;
            });
        };

        vm.loadAll();
        
    }
})();

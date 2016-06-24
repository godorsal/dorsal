(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SupportcaseController', SupportcaseController);

    SupportcaseController.$inject = ['$scope', '$state', 'Supportcase'];

    function SupportcaseController ($scope, $state, Supportcase) {
        var vm = this;
        vm.supportcases = [];
        vm.loadAll = function() {
            Supportcase.query(function(result) {
                vm.supportcases = result;
                console.log(result);
            });
        };

        vm.loadAll();

    }
})();

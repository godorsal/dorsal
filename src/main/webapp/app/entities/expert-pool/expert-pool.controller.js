(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertPoolController', ExpertPoolController);

    ExpertPoolController.$inject = ['$scope', '$state', 'ExpertPool'];

    function ExpertPoolController ($scope, $state, ExpertPool) {
        var vm = this;
        
        vm.expertPools = [];

        loadAll();

        function loadAll() {
            ExpertPool.query(function(result) {
                vm.expertPools = result;
            });
        }
    }
})();

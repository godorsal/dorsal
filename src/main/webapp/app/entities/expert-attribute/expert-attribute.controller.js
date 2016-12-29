(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAttributeController', ExpertAttributeController);

    ExpertAttributeController.$inject = ['$scope', '$state', 'ExpertAttribute'];

    function ExpertAttributeController ($scope, $state, ExpertAttribute) {
        var vm = this;
        
        vm.expertAttributes = [];

        loadAll();

        function loadAll() {
            ExpertAttribute.query(function(result) {
                vm.expertAttributes = result;
            });
        }
    }
})();

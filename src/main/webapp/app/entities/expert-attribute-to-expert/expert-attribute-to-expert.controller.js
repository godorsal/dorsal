(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAttributeToExpertController', ExpertAttributeToExpertController);

    ExpertAttributeToExpertController.$inject = ['$scope', '$state', 'ExpertAttributeToExpert'];

    function ExpertAttributeToExpertController ($scope, $state, ExpertAttributeToExpert) {
        var vm = this;
        
        vm.expertAttributeToExperts = [];

        loadAll();

        function loadAll() {
            ExpertAttributeToExpert.query(function(result) {
                vm.expertAttributeToExperts = result;
            });
        }
    }
})();

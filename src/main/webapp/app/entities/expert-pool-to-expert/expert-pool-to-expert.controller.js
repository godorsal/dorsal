(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertPoolToExpertController', ExpertPoolToExpertController);

    ExpertPoolToExpertController.$inject = ['$scope', '$state', 'ExpertPoolToExpert'];

    function ExpertPoolToExpertController ($scope, $state, ExpertPoolToExpert) {
        var vm = this;
        
        vm.expertPoolToExperts = [];

        loadAll();

        function loadAll() {
            ExpertPoolToExpert.query(function(result) {
                vm.expertPoolToExperts = result;
            });
        }
    }
})();

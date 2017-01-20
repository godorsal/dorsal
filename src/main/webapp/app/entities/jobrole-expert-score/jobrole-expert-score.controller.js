(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('JobroleExpertScoreController', JobroleExpertScoreController);

    JobroleExpertScoreController.$inject = ['$scope', '$state', 'JobroleExpertScore'];

    function JobroleExpertScoreController ($scope, $state, JobroleExpertScore) {
        var vm = this;
        
        vm.jobroleExpertScores = [];

        loadAll();

        function loadAll() {
            JobroleExpertScore.query(function(result) {
                vm.jobroleExpertScores = result;
            });
        }
    }
})();

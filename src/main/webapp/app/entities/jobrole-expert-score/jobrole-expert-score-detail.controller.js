(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('JobroleExpertScoreDetailController', JobroleExpertScoreDetailController);

    JobroleExpertScoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'JobroleExpertScore', 'ExpertAccount', 'JobRole'];

    function JobroleExpertScoreDetailController($scope, $rootScope, $stateParams, previousState, entity, JobroleExpertScore, ExpertAccount, JobRole) {
        var vm = this;

        vm.jobroleExpertScore = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:jobroleExpertScoreUpdate', function(event, result) {
            vm.jobroleExpertScore = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

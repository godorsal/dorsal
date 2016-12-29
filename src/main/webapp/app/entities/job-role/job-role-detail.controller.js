(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('JobRoleDetailController', JobRoleDetailController);

    JobRoleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'JobRole', 'JobroleExpertScore'];

    function JobRoleDetailController($scope, $rootScope, $stateParams, previousState, entity, JobRole, JobroleExpertScore) {
        var vm = this;

        vm.jobRole = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:jobRoleUpdate', function(event, result) {
            vm.jobRole = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

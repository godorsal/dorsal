(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('JobRoleController', JobRoleController);

    JobRoleController.$inject = ['$scope', '$state', 'JobRole'];

    function JobRoleController ($scope, $state, JobRole) {
        var vm = this;
        
        vm.jobRoles = [];

        loadAll();

        function loadAll() {
            JobRole.query(function(result) {
                vm.jobRoles = result;
            });
        }
    }
})();

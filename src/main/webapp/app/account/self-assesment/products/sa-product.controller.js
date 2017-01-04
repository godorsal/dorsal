(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('SelfAssesmentProductController', SelfAssesmentProductController);

    SelfAssesmentProductController.$inject = ['$state', 'Technology', 'Principal', 'DrslUserFlowService'];

    function SelfAssesmentProductController($state, Technology, Principal, DrslUserFlowService) {

        DrslUserFlowService.handleUserFlow();

        var vm = this;
        vm.products = [
            "MySQL",
            "MariaDB",
            "PostgreSQL",
            "MongoDB",
            "Oracle DB",
            "MS SQL",
            "Hadoop",
            "XtraDB Cluster",
            "Tungsten Cluster",
            "Galera Cluster",
            "PGCluster",
            "PGPool",
            "PostgreSQL-XL",
            "Xtra Backup",
            "Ansible",
            "Puppet",
            "Chef",
            "CFEngine",
            "Neo4J"]
            console.log(vm.products);
        vm.scores = [1, 2, 3, 4, 5]

        vm.expert = DrslUserFlowService.user.expert;

        vm.submit = submit;

        function submit() {
            vm.expert.technologies = vm.technologies;
            $state.go('settings')
        }
    }
})();

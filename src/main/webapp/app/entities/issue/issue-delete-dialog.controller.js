(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('IssueDeleteController',IssueDeleteController);

    IssueDeleteController.$inject = ['$uibModalInstance', 'entity', 'Issue'];

    function IssueDeleteController($uibModalInstance, entity, Issue) {
        var vm = this;
        vm.issue = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Issue.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

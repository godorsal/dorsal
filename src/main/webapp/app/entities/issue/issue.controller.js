(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('IssueController', IssueController);

    IssueController.$inject = ['$scope', '$state', 'Issue'];

    function IssueController ($scope, $state, Issue) {
        var vm = this;
        vm.issues = [];
        vm.loadAll = function() {
            Issue.query(function(result) {
                vm.issues = result;
            });
        };

        vm.loadAll();
        
    }
})();

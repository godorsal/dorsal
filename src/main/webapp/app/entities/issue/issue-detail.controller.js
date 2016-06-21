(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('IssueDetailController', IssueDetailController);

    IssueDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Issue'];

    function IssueDetailController($scope, $rootScope, $stateParams, entity, Issue) {
        var vm = this;
        vm.issue = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:issueUpdate', function(event, result) {
            vm.issue = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

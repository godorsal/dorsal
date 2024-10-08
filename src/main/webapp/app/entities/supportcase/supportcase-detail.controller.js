(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SupportcaseDetailController', SupportcaseDetailController);

    SupportcaseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Supportcase', 'User', 'ExpertAccount', 'Technology', 'Status', 'Issue'];

    function SupportcaseDetailController($scope, $rootScope, $stateParams, entity, Supportcase, User, ExpertAccount, Technology, Status, Issue) {
        var vm = this;
        vm.supportcase = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:supportcaseUpdate', function(event, result) {
            vm.supportcase = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

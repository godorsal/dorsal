(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ExpertAccountDetailController', ExpertAccountDetailController);

    ExpertAccountDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ExpertAccount', 'User', 'Useraccount', 'Supportcase', 'Technology', 'Issue'];

    function ExpertAccountDetailController($scope, $rootScope, $stateParams, entity, ExpertAccount, User, Useraccount, Supportcase, Technology, Issue) {
        var vm = this;
        vm.expertAccount = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:expertAccountUpdate', function(event, result) {
            vm.expertAccount = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

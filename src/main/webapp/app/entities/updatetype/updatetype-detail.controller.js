(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UpdatetypeDetailController', UpdatetypeDetailController);

    UpdatetypeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Updatetype', 'Caseupdate'];

    function UpdatetypeDetailController($scope, $rootScope, $stateParams, entity, Updatetype, Caseupdate) {
        var vm = this;
        vm.updatetype = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:updatetypeUpdate', function(event, result) {
            vm.updatetype = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

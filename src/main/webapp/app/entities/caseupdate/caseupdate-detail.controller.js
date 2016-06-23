(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseupdateDetailController', CaseupdateDetailController);

    CaseupdateDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Caseupdate', 'User', 'Supportcase', 'Updatetype'];

    function CaseupdateDetailController($scope, $rootScope, $stateParams, entity, Caseupdate, User, Supportcase, Updatetype) {
        var vm = this;
        vm.caseupdate = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:caseupdateUpdate', function(event, result) {
            vm.caseupdate = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

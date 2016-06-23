(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ReferencedocDetailController', ReferencedocDetailController);

    ReferencedocDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Referencedoc', 'User', 'Technology'];

    function ReferencedocDetailController($scope, $rootScope, $stateParams, entity, Referencedoc, User, Technology) {
        var vm = this;
        vm.referencedoc = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:referencedocUpdate', function(event, result) {
            vm.referencedoc = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

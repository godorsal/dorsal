(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CasetechnologypropertyDetailController', CasetechnologypropertyDetailController);

    CasetechnologypropertyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Casetechnologyproperty', 'Supportcase', 'Technology'];

    function CasetechnologypropertyDetailController($scope, $rootScope, $stateParams, entity, Casetechnologyproperty, Supportcase, Technology) {
        var vm = this;
        vm.casetechnologyproperty = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:casetechnologypropertyUpdate', function(event, result) {
            vm.casetechnologyproperty = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

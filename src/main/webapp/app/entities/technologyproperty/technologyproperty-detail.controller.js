(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologypropertyDetailController', TechnologypropertyDetailController);

    TechnologypropertyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Technologyproperty', 'Technologypropertyvalue'];

    function TechnologypropertyDetailController($scope, $rootScope, $stateParams, entity, Technologyproperty, Technologypropertyvalue) {
        var vm = this;
        vm.technologyproperty = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:technologypropertyUpdate', function(event, result) {
            vm.technologyproperty = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologypropertyvalueDetailController', TechnologypropertyvalueDetailController);

    TechnologypropertyvalueDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Technologypropertyvalue', 'Technology', 'Technologyproperty'];

    function TechnologypropertyvalueDetailController($scope, $rootScope, $stateParams, entity, Technologypropertyvalue, Technology, Technologyproperty) {
        var vm = this;
        vm.technologypropertyvalue = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:technologypropertyvalueUpdate', function(event, result) {
            vm.technologypropertyvalue = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

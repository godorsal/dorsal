(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('TechnologyDetailController', TechnologyDetailController);

    TechnologyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Technology', 'Technologypropertyvalue', 'Referencedoc', 'Supportcase', 'Casetechnologyproperty'];

    function TechnologyDetailController($scope, $rootScope, $stateParams, entity, Technology, Technologypropertyvalue, Referencedoc, Supportcase, Casetechnologyproperty) {
        var vm = this;
        vm.technology = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:technologyUpdate', function(event, result) {
            vm.technology = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

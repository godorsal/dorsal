(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SpecialityDetailController', SpecialityDetailController);

    SpecialityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Speciality', 'SpecialityExpertScore'];

    function SpecialityDetailController($scope, $rootScope, $stateParams, previousState, entity, Speciality, SpecialityExpertScore) {
        var vm = this;

        vm.speciality = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:specialityUpdate', function(event, result) {
            vm.speciality = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

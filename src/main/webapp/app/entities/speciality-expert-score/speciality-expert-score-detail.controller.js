(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SpecialityExpertScoreDetailController', SpecialityExpertScoreDetailController);

    SpecialityExpertScoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'SpecialityExpertScore', 'ExpertAccount', 'Speciality'];

    function SpecialityExpertScoreDetailController($scope, $rootScope, $stateParams, previousState, entity, SpecialityExpertScore, ExpertAccount, Speciality) {
        var vm = this;

        vm.specialityExpertScore = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dorsalApp:specialityExpertScoreUpdate', function(event, result) {
            vm.specialityExpertScore = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('SpecialityController', SpecialityController);

    SpecialityController.$inject = ['$scope', '$state', 'Speciality'];

    function SpecialityController ($scope, $state, Speciality) {
        var vm = this;
        
        vm.specialities = [];

        loadAll();

        function loadAll() {
            Speciality.query(function(result) {
                vm.specialities = result;
            });
        }
    }
})();

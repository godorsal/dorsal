(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseController', CaseController);

    CaseController.$inject = ['$scope', '$state'];

    function CaseController($scope, $state) {
        var vm = this;

        vm.init = init;

        vm.init();

        function init(){

        }
    }
})();

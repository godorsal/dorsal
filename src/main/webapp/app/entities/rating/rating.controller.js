(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('RatingController', RatingController);

    RatingController.$inject = ['$scope', '$state', 'Rating'];

    function RatingController ($scope, $state, Rating) {
        var vm = this;
        vm.ratings = [];
        vm.loadAll = function() {
            Rating.query(function(result) {
                vm.ratings = result;
            });
        };

        vm.loadAll();
        
    }
})();

(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('RatingDetailController', RatingDetailController);

    RatingDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Rating', 'Supportcase'];

    function RatingDetailController($scope, $rootScope, $stateParams, entity, Rating, Supportcase) {
        var vm = this;
        vm.rating = entity;
        
        var unsubscribe = $rootScope.$on('dorsalApp:ratingUpdate', function(event, result) {
            vm.rating = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();

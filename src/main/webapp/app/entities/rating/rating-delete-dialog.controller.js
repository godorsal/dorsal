(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('RatingDeleteController',RatingDeleteController);

    RatingDeleteController.$inject = ['$uibModalInstance', 'entity', 'Rating'];

    function RatingDeleteController($uibModalInstance, entity, Rating) {
        var vm = this;
        vm.rating = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Rating.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

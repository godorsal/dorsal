(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('RatingService', RatingService);

    RatingService.$inject = ['$uibModal'];

    function RatingService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open (drslCase) {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/rating/rating.html',
                controller: 'RatingController',
                controllerAs: 'vm',
                size:'sm',
                resolve: {
                    drslCase: function(){ return drslCase; },
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('rating');
                        return $translate.refresh();
                    }]
                }
            });
            modalInstance.result.then(
                resetModal,
                resetModal
            );

            return modalInstance;
        }
    }
})();

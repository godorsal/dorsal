(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('DrslRatingService', DrslRatingService);

    DrslRatingService.$inject = ['$uibModal'];

    function DrslRatingService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open (drslCase, drslBadges) {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/rating/rating.html',
                controller: 'DrslRatingController',
                controllerAs: 'vm',
                size:'md',
                resolve: {
                    drslCase: function(){ return drslCase; },
                    drslBadges: function(){ return drslBadges; },
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

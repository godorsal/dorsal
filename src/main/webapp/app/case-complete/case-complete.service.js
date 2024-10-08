(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('CaseCompleteService', CaseCompleteService);

    CaseCompleteService.$inject = ['$uibModal'];

    function CaseCompleteService ($uibModal) {
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
                templateUrl: 'app/case-complete/case-complete.html',
                controller: 'CaseCompleteController',
                controllerAs: 'vm',
                size:'xs',
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

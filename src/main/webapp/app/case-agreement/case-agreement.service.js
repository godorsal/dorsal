(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('CaseAgreementService', CaseAgreementService);

    CaseAgreementService.$inject = ['$uibModal'];

    function CaseAgreementService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open (drslCase, expert) {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/case-agreement/case-agreement.html',
                controller: 'CaseAgreementController',
                controllerAs: 'vm',
                size:'md',
                resolve: {
                    drslCase: function(){ return drslCase; },
                    expert: function(){ return expert; },
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

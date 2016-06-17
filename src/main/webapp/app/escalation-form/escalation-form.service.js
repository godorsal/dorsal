(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('EscalationFormService', EscalationFormService);

    EscalationFormService.$inject = ['$uibModal'];

    function EscalationFormService ($uibModal) {
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
                templateUrl: 'app/escalation-form/escalation-form.html',
                controller: 'EscalationFormController',
                controllerAs: 'vm',
                size:'sm',
                // size:'lg',
                resolve: {
                    drslCase: function(){ return drslCase; },
                    expert: function(){ return expert; },
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('case-details');
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

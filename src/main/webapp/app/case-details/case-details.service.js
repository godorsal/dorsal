(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('CaseDetailsService', CaseDetailsService);

    CaseDetailsService.$inject = ['$uibModal'];

    function CaseDetailsService ($uibModal) {
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
                templateUrl: 'app/case-details/case-details.html',
                controller: 'CaseDetailsController',
                controllerAs: 'vm',
                size:'lg',
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

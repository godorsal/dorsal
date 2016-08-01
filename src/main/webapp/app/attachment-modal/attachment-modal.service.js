(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('AttachmentModalService', AttachmentModalService);

    AttachmentModalService.$inject = ['$uibModal'];

    function AttachmentModalService ($uibModal) {
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
                templateUrl: 'app/attachment-modal/attachment-modal.html',
                controller: 'AttachmentModalController',
                controllerAs: 'vm',
                size:'sm',
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

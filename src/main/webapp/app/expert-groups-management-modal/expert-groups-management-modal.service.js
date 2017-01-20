(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .factory('ExpertGroupsManagementModal', ExpertGroupsManagementModal);

    ExpertGroupsManagementModal.$inject = ['$uibModal', '$translate'];

    function ExpertGroupsManagementModal ($uibModal, $translate) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open (group, viewOnly) {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/expert-groups-management-modal/expert-groups-management-modal.html',
                controller: 'ExpertGroupsManagementModalController',
                controllerAs: 'vm',
                // backdrop: true,
                // backdrop: viewOnly,
                // backdrop: 'static',
                size:'sm',
                windowClass: 'drsl-rating-comment-modal',
                resolve: {
                    group: function(){ return group; },
                    viewOnly: function(){ return viewOnly; }
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

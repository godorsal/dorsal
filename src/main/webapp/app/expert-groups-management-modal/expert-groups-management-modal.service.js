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

        function open (group) {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/expert-groups-management-modal/expert-groups-management-modal.html',
                controller: 'ExpertGroupsManagementModal',
                controllerAs: 'vm',
                size:'sm',
                windowClass: 'drsl-rating-comment-modal',
                resolve: {
                    group: function(){ return group; }
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

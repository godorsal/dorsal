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

        function open (group, option) {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/expert-groups-management-modal/expert-groups-management-modal.html',
                controller: 'ExpertGroupsManagementModalController',
                controllerAs: 'vm',
                backdrop: 'static',
                size:'sm',
                windowClass: 'drsl-rating-comment-modal',
                resolve: {
                    group: function(){ return group; },
                    option: function(){ return option; }
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

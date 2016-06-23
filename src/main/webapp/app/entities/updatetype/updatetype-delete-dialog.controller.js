(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UpdatetypeDeleteController',UpdatetypeDeleteController);

    UpdatetypeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Updatetype'];

    function UpdatetypeDeleteController($uibModalInstance, entity, Updatetype) {
        var vm = this;
        vm.updatetype = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Updatetype.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

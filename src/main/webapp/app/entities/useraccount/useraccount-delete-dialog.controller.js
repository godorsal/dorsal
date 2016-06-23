(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('UseraccountDeleteController',UseraccountDeleteController);

    UseraccountDeleteController.$inject = ['$uibModalInstance', 'entity', 'Useraccount'];

    function UseraccountDeleteController($uibModalInstance, entity, Useraccount) {
        var vm = this;
        vm.useraccount = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Useraccount.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();

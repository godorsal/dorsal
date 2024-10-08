(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseCompleteController', CaseCompleteController);

    CaseCompleteController.$inject = ['$uibModalInstance', 'Caseupdate', 'StatusModel', 'drslCase', '$document'];

    function CaseCompleteController($uibModalInstance, Caseupdate, StatusModel, drslCase, $document) {
        var vm = this;
        vm.case = drslCase;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.caseUpdate = {
            "updateMsg": "",
            "user": vm.case.user,
            "supportcase": vm.case,
            "updatetype": {
                "id": 2
            }
        };
        $document.keyup(function(e) {
             if (e.keyCode == 27) {
                 cancel ()
            }
        });
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            Caseupdate.save(vm.caseUpdate);
            vm.case.isResolved = true;
            vm.case.status = StatusModel.getState('completed');
            vm.case.$update();

            $uibModalInstance.close({"updated": true})
        }
    }
})();

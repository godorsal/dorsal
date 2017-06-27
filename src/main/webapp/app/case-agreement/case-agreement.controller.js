(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseAgreementController', CaseAgreementController);

    CaseAgreementController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'DrslMetadata', '$document', '$http', 'Payment'];

    function CaseAgreementController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, DrslMetadata, $document, $http, Payment) {
        var vm = this;

        vm.case = drslCase;
        console.log("CASE!", drslCase.estimateHours * 125);
        vm.expert = expert;
        vm.cancel = cancel;
        vm.submit = submit;
        vm.agreeToEstimate = false;
        vm.DrslMetadata = DrslMetadata;

        $document.keyup(function(e) {
             if (e.keyCode == 27) {
                 cancel ()
            }
        });

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            Payment.query(function (res) {
                // vm.paymentInProgress = true;
                var splitter = res[0].ccdata.split("##");
                var amount = drslCase.estimateHours * 125;
                vm.superMagicString = (splitter[1] + "#" + splitter[2] + "," + splitter[3] + "#" + amount);
                if(amount > 0){
                    $http({
                        url: 'api/payments/auth',
                        method: 'PUT',
                        data: vm.superMagicString,
                        transformResponse: [function (data) {
                            if(data === "PAYMENT SUCCESS"){
                                toastr.success("Payment Successful");
                                // closeCase(result);
                            } else if (data === "PAYMENT FAILURE") {
                                vm.paymentInProgress = false;
                                toastr.error("Payment failure, click to check payment settings", {
                                    timeOut: 0,
                                    toastClass: 'toast drsl-user-flow-toast',
                                    onTap: function () {
                                        $state.go('settings');
                                    }
                                });
                                //     return;
                            } else {
                                vm.paymentInProgress = false;
                                toastr.error("Payment failure, click to check payment settings", {
                                    timeOut: 0,
                                    toastClass: 'toast drsl-user-flow-toast',
                                    onTap: function () {
                                        $state.go('settings');
                                    }
                                });
                            }
                            return data;
                        }]
                    });
                } else {
                    console.log('A');
                    // closeCase(result);
                }
            })
            // if (vm.agreeToEstimate) {
            //     $uibModalInstance.close({"rated": true});
            // }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseAgreementController', CaseAgreementController);

    CaseAgreementController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'expert', 'DrslMetadata', '$document', '$http', 'Payment'];

    function CaseAgreementController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, expert, DrslMetadata, $document, $http, Payment) {
        var vm = this;

        vm.case = drslCase;
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
                vm.paymentInProgress = true;
                var splitter = res[0].ccdata.split("##");
                var amount = drslCase.estimateHours * 125;
                vm.superMagicString = (splitter[1] + "#" + splitter[2] + "," + splitter[3] + "#" + (amount * 100));
                console.log(vm.superMagicString);
                if(amount > 0){
                    $http({
                        url: 'api/payments/auth',
                        method: 'PUT',
                        data: vm.superMagicString,
                        transformResponse: [function (data) {
                            console.log("DATA", data);
                            var stripeResp = data.split(':')[1];
                            console.log(stripeResp);
                            if(data === "PAYMENT SUCCESS"){
                                toastr.success("Case Estimate Agreed");
                                if (vm.agreeToEstimate) {
                                    // $uibModalInstance.close({"rated": true});
                                }
                            } else if (stripeResp === " Your card has insufficient funds.; request-id" ) {
                                vm.paymentInProgress = false;
                                toastr.error("Insufficient Funds", {
                                    timeOut: 0,
                                    toastClass: 'toast drsl-user-flow-toast',
                                    onTap: function () {
                                        $state.go('settings');
                                    }
                                });
                            } else if(stripeResp ===  " Your card number is incorrect.; request-id") {
                                vm.paymentInProgress = false;
                                toastr.error("Invalid Card Number", {
                                    timeOut: 0,
                                    toastClass: 'toast drsl-user-flow-toast',
                                    onTap: function () {
                                        $state.go('settings');
                                    }
                                });
                            } else {
                                vm.paymentInProgress = false;
                                toastr.error("Invalid Card Number", {
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
                }
            })
        }
    }
})();

(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .controller('DrslRatingController', DrslRatingController);

    DrslRatingController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'drslBadges', 'Caseupdate', 'toastr', '$document', 'Payment', '$http', 'DrslFinalAmountService'];

    function DrslRatingController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, drslBadges, Caseupdate, toastr, $document, Payment, $http, DrslFinalAmountService) {
        var vm = this;
        vm.case = drslCase;


        vm.badges = drslBadges;
        vm.technologyProperties = {};
        vm.detailedResolutions = '';
        vm.formSubmitted = false;
        vm.ratingComments = null;
        vm.ratingCommentsError = $translate.instant('case.rating.ratingComments.error');
        vm.techBadges = vm.badges.filter(function (badge) {
            var searchString = 'tech_';
            return (badge.name.substr(0, searchString.length) === searchString);
        });
        vm.personalBadges = vm.badges.filter(function (badge) {
            var searchString = 'personal_';
            return (badge.name.substr(0, searchString.length) === searchString);
        });
        vm.cancel = cancel;
        vm.submit = submit;

        // TODO: shouldn't be pulling back every case update record. After API is updated fix here as well.
        Caseupdate.query(function(result){
            result.reverse().forEach(function(update){
                if(update.supportcase.id === vm.case.id && update.updatetype.id == 2){
                    vm.detailedResolutions = update.updateMsg;
                }
            })
        });

        vm.radios = [
            [{
                "id": "satisfaction",
                "label": "case.rating.label.satisfaction",
                "values": [
                    {
                        "label": "case.rating.value.poorIncomplete",
                        "value": "65"
                    },
                    {
                        "label": "case.rating.value.average",
                        "value": "75"
                    },
                    {
                        "label": "case.rating.value.good",
                        "value": "85"
                    },
                    {
                        "label": "case.rating.value.excellent",
                        "value": "100"
                    }
                ],
                "selectedValue": "100"
            }],
            [{
                "id": "prompt",
                "label": "case.rating.label.prompt",
                "values": [
                    {
                        "label": "case.rating.value.poorIncomplete",
                        "value": "65"
                    },
                    {
                        "label": "case.rating.value.average",
                        "value": "75"
                    },
                    {
                        "label": "case.rating.value.good",
                        "value": "85"
                    },
                    {
                        "label": "case.rating.value.excellent",
                        "value": "100"
                    }
                ],
                "selectedValue": "100"
            }],
            [{
                "id": "courtesy",
                "label": "case.rating.label.courtesy",
                "values": [
                    {
                        "label": "case.rating.value.poor",
                        "value": "65"
                    },
                    {
                        "label": "case.rating.value.average",
                        "value": "75"
                    },
                    {
                        "label": "case.rating.value.good",
                        "value": "85"
                    },
                    {
                        "label": "case.rating.value.excellent",
                        "value": "100"
                    }
                ],
                "selectedValue": "100"
            }],
            [{
                "id": "skill",
                "label": "case.rating.label.skill",
                "values": [
                    {
                        "label": "case.rating.value.poorIncomplete",
                        "value": "65"
                    },
                    {
                        "label": "case.rating.value.average",
                        "value": "75"
                    },
                    {
                        "label": "case.rating.value.good",
                        "value": "85"
                    },
                    {
                        "label": "case.rating.value.excellent",
                        "value": "100"
                    }
                ],
                "selectedValue": "100"
            }]
        ];

        $document.keyup(function(e) {
            if (e.keyCode == 27) {
                cancel ()
            }
        });

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            if (!vm.ratingComments || vm.ratingComments.replace(/\s/g, '').length === 0) {
                ratingForm.ratingComments.focus();
                toastr.error(vm.ratingCommentsError, 'Error');
                return;
            }
            Payment.query(function (res) {
                vm.paymentInProgress = true;
                var splitter = res[0].ccdata.split("##");
                var firstAmount = vm.case.timeOnCase * 125;
                switch (vm.radios[0][0].selectedValue) {
                    case "65":
                    var firstPercentage = 0;
                    break;
                    case "75":
                    var firstPercentage = 50;
                    break;
                    case "85":
                    var firstPercentage = 90;
                    break;
                    case "100":
                    var firstPercentage = 100;
                    break;
                    default:

                }
                var result = ((firstPercentage / 100) * firstAmount) * 100;
                var melp = (firstPercentage / 100) * firstAmount;
                console.log(melp);
                console.log(melp* 100);
                vm.superMagicString = (splitter[1] + "#" + splitter[2] + "," + splitter[3] + "#" + result);
                if(result > 0){
                    $http({
                        url: 'api/payments/pay',
                        method: 'PUT',
                        data: vm.superMagicString,
                        transformResponse: [function (data) {
                            if(data === "PAYMENT SUCCESS"){
                                toastr.success("Payment Successful");
                                closeCase(melp);
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
                    closeCase(melp);
                }
            })

        }
        function showFinalAmount(amount) {
            var modalInstance = DrslFinalAmountService.open(amount, vm.case, vm.ratingComments)
        }
        function closeCase(result, rating) {
            var combinedTotal = 0, combinedAverage, csv = [], selectedBadges = [], i, badge;

            vm.formSubmitted = true;

            if (!vm.ratingComments || vm.ratingComments.replace(/\s/g, '').length === 0) {
                ratingForm.ratingComments.focus();
                toastr.error(vm.ratingCommentsError, 'Error');
                return;
            }

            for (i = 0; i < vm.radios.length; i++) {
                var radio = vm.radios[i][0];
                combinedTotal += Number(radio.selectedValue);
                csv.push(radio.id + ' ' + radio.selectedValue);
            }

            combinedAverage = Math.round(combinedTotal / vm.radios.length);

            for (i = 0; i < vm.badges.length; i++) {
                badge = vm.badges[i];

                if (badge.selected) {
                    delete badge.selected;
                    selectedBadges.push(badge);
                }
            }

            $uibModalInstance.close({
                "rated": true,
                "score": combinedAverage,
                "rateDetails": csv.join(','),
                "ratingComments": vm.ratingComments,
                "hasExpertExceeded": false,
                "selectedBadges": selectedBadges
            });
            vm.paymentInProgress = false;
            showFinalAmount(result);
        }
    }
})();

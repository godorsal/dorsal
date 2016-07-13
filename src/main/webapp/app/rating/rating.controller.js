(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('DrslRatingController', DrslRatingController);

    DrslRatingController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase', 'drslBadges'];

    function DrslRatingController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase, drslBadges) {
        var vm = this;
        vm.case = drslCase;
        vm.badges = drslBadges;
        vm.technologyProperties = {};
        vm.cancel = cancel;
        vm.submit = submit;

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

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            var combinedTotal = 0, combinedAverage = 0, csv = [], i;

            for (i = 0; i < vm.radios.length; i++) {
                var radio = vm.radios[i][0];
                combinedTotal += Number(radio.selectedValue);
                csv.push(radio.id + ' ' + radio.selectedValue);
            }

            combinedAverage = Math.round(combinedTotal / vm.radios.length);

            $uibModalInstance.close({
                "rated": true,
                "score": combinedAverage,
                "rateDetails": csv.join(','),
                "hasExpertExceeded": false
            });
        }
    }
})();

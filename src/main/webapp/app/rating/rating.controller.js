(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('DrslRatingController', DrslRatingController);

    DrslRatingController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase'];

    function DrslRatingController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase) {
        var vm = this;
        vm.case = drslCase;
        vm.technologyProperties = {};
        vm.cancel = cancel;
        vm.submit = submit;

        vm.radios = [
            {
                "id": "satisfaction",
                "label": "case.rating.label.satisfaction",
                "values": [
                    {
                        "label": "case.rating.value.poorIncomplete",
                        "value": "poor"
                    },
                    {
                        "label": "case.rating.value.average",
                        "value": "average"
                    },
                    {
                        "label": "case.rating.value.good",
                        "value": "good"
                    },
                    {
                        "label": "case.rating.value.excellent",
                        "value": "excellent"
                    }
                ],
                "selectedValue": "excellent"
            },
            {
                "id": "prompt",
                "label": "case.rating.label.prompt",
                "values": [
                    {
                        "label": "case.rating.value.poorIncomplete",
                        "value": "poor"
                    },
                    {
                        "label": "case.rating.value.average",
                        "value": "average"
                    },
                    {
                        "label": "case.rating.value.good",
                        "value": "good"
                    },
                    {
                        "label": "case.rating.value.excellent",
                        "value": "excellent"
                    }
                ],
                "selectedValue": "excellent"
            },
            {
                "id": "courtesy",
                "label": "case.rating.label.courtesy",
                "values": [
                    {
                        "label": "case.rating.value.poor",
                        "value": "poor"
                    },
                    {
                        "label": "case.rating.value.average",
                        "value": "average"
                    },
                    {
                        "label": "case.rating.value.good",
                        "value": "good"
                    },
                    {
                        "label": "case.rating.value.excellent",
                        "value": "excellent"
                    }
                ],
                "selectedValue": "excellent"
            },
            {
                "id": "skill",
                "label": "case.rating.label.skill",
                "values": [
                    {
                        "label": "case.rating.value.poorIncomplete",
                        "value": "poor"
                    },
                    {
                        "label": "case.rating.value.average",
                        "value": "average"
                    },
                    {
                        "label": "case.rating.value.good",
                        "value": "good"
                    },
                    {
                        "label": "case.rating.value.excellent",
                        "value": "excellent"
                    }
                ],
                "selectedValue": "excellent"
            },

        ];

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function submit() {
            $uibModalInstance.close({"rated": true});
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('RatingController', RatingController);

    RatingController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate'];

    function RatingController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate) {
        var vm = this;
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

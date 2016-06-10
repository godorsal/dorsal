(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('RatingController', RatingController);

    RatingController.$inject = ['$rootScope', '$state', '$timeout', 'Auth', '$uibModalInstance', '$translate', 'drslCase'];

    function RatingController($rootScope, $state, $timeout, Auth, $uibModalInstance, $translate, drslCase) {
        var vm = this;
        vm.case = drslCase;
        vm.cancel = cancel;
        vm.submit = submit;

        vm.badges = [
            {
                "icon": "badge-1",
                "description": "happy fun place"
            },
            {
                "icon": "badge-2",
                "description": "defender of the realm"
            },
            {
                "icon": "badge-3",
                "description": "craftsperson"
            },
            {
                "icon": "badge-4",
                "description": "detail oriented"
            },
            {
                "icon": "badge-5",
                "description": "focused like a laser"
            },
            {
                "icon": "badge-6",
                "description": "McLuvin It!"
            },
            {
                "icon": "badge-7",
                "description": "masterful multitasking"
            },{
                "icon": "badge-8",
                "description": "network specialist"
            },{
                "icon": "badge-9",
                "description": "double plus good"
            },
            {
                "icon": "badge-10",
                "description": "database magician"
            },
            {
                "icon": "badge-11",
                "description": "super heavy lifter"
            },
            {
                "icon": "badge-12",
                "description": "resolution writer pro"
            },
            {
                "icon": "badge-13",
                "description": "time sensitive"
            }
        ];

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

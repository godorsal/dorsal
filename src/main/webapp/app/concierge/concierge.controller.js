(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ConciergeController', ConciergeController);

    ConciergeController.$inject = ['$scope', '$state', 'LoginService', 'Principal'];

    function ConciergeController($scope, $state, LoginService, Principal) {
        var vm = this;

        vm.init = init;
        vm.submitForm = submitForm;
        vm.productDetailInputComplete = false;
        vm.isAuthenticated = Principal.isAuthenticated;

        vm.caseDetails = {
            summary: '',
            description: '',
            radios: [
                {
                    id: 'urgency',
                    label: 'Urgency',
                    values: [
                        {
                            label: 'Immediate',
                            value: 'Immediate',
                        },
                        {
                            label: '4 hours',
                            value: '4 hrs',
                        },
                        {
                            label: '1 day',
                            value: '1 day',
                        },
                        {
                            label: 'this week',
                            value: 'this week',
                        }
                    ],
                    selectedValue: ''
                },
                {
                    id: 'problem',
                    label: 'Problem Type',
                    values: [
                        {
                            label: 'Performance',
                            value: 'Performance',
                        },
                        {
                            label: 'Availability',
                            value: 'Availability',
                        },
                        {
                            label: 'Security',
                            value: 'Security',
                        },
                        {
                            label: 'Other',
                            value: 'Other',
                        }
                    ],
                    selectedValue: ''
                },
                {
                    id: 'product',
                    label: 'Database Type',
                    values: [
                        {
                            label: 'MySQL',
                            value: 'MySQL',
                            incidentTypes: [
                                {
                                    description: 'Which version?',
                                    types: [
                                        {
                                            label: '',
                                            value: '',
                                            type: 'field'
                                        },
                                        {
                                            label: 'No version',
                                            value: ''
                                        }
                                    ]
                                },
                                {
                                    description: 'Performance Problems?',
                                    types: [
                                        {
                                            label: 'System crash',
                                            value: 'SC'
                                        },
                                        {
                                            label: 'Slow queries',
                                            value: 'SQ'
                                        },
                                        {
                                            label: 'High CPU/mem',
                                            value: 'HC'
                                        },
                                        {
                                            label: 'Temporal paradox',
                                            value: 'TP'
                                        },
                                        {
                                            label: 'Not performance related',
                                            value: ''
                                        }
                                    ]
                                },
                                {
                                    description: 'Hardware Related?',
                                    types: [
                                        {
                                            label: 'Things are broken',
                                            value: 'TB'
                                        },
                                        {
                                            label: 'There was smoke',
                                            value: 'SQ'
                                        },
                                        {
                                            label: 'There was fire',
                                            value: 'HC'
                                        },
                                        {
                                            label: 'Not hardware related',
                                            value: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'PostgreSQL',
                            value: 'PostgreSQL',
                            incidentTypes: [
                                {
                                    description: 'Which version?',
                                    types: [
                                        {
                                            label: '',
                                            value: '',
                                            type: 'field'
                                        },
                                        {
                                            label: 'No version',
                                            value: ''
                                        }
                                    ]
                                },
                                {
                                    description: 'Performance Problems (postgreSQL)?',
                                    types: [
                                        {
                                            label: 'Performance thing one',
                                            value: 'pt1'
                                        },
                                        {
                                            label: 'Performance thing two',
                                            value: 'pt2'
                                        },
                                        {
                                            label: 'Performance thing three',
                                            value: 'pt3'
                                        },
                                        {
                                            label: 'Not performance related',
                                            value: ''
                                        }
                                    ]
                                },
                                {
                                    description: 'Hardware Related (postgreSQL)?',
                                    types: [
                                        {
                                            label: 'Hardware thing one',
                                            value: 'ht1'
                                        },
                                        {
                                            label: 'Hardware thing two',
                                            value: 'ht2'
                                        },
                                        {
                                            label: 'Hardware thing three',
                                            value: 'ht3'
                                        },
                                        {
                                            label: 'Hardware thing four',
                                            value: 'ht4'
                                        },
                                        {
                                            label: 'Not hardware related',
                                            value: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'MongoDB',
                            value: 'MongoDB',
                            incidentTypes: [
                                {
                                    description: 'Which version?',
                                    types: [
                                        {
                                            label: '',
                                            value: '',
                                            type: 'field'
                                        },
                                        {
                                            label: 'No version',
                                            value: ''
                                        }
                                    ]
                                },
                                {
                                    description: 'Performance Problems (MongoDB)?',
                                    types: [
                                        {
                                            label: 'Performance thing one',
                                            value: 'pt1'
                                        },
                                        {
                                            label: 'Performance thing two',
                                            value: 'pt2'
                                        },
                                        {
                                            label: 'Performance thing three',
                                            value: 'pt3'
                                        },
                                        {
                                            label: 'Not performance related',
                                            value: ''
                                        }
                                    ]
                                },
                                {
                                    description: 'Hardware Related (MongoDB)?',
                                    types: [
                                        {
                                            label: 'Hardware thing one',
                                            value: 'ht1'
                                        },
                                        {
                                            label: 'Hardware thing two',
                                            value: 'ht2'
                                        },
                                        {
                                            label: 'Hardware thing three',
                                            value: 'ht3'
                                        },
                                        {
                                            label: 'Hardware thing four',
                                            value: 'ht4'
                                        },
                                        {
                                            label: 'Not hardware related',
                                            value: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'MariaDB',
                            value: 'MariaDB',
                            incidentTypes: []
                        }
                    ],

                    selectedValue: '',
                    incidentTypeSelections: []
                }
            ]
        };

        // Store a shortcut reference to the product object
        vm.product = vm.caseDetails.radios.filter(function (o) {
            return o.id === 'product';
        })[0];

        // Watch for changes on the product's selected value property and clear out incidentTypeSelections on change
        $scope.$watch('vm.product.selectedValue', function(newValue, oldValue){
            if (oldValue && oldValue !== newValue) {
                vm.product.incidentTypeSelections = [];
                vm.productDetailInputComplete = false;
            }
        });

        vm.init();

        function init(){
            vm.pageTitle = '';

            switch ($state.params.type) {
                case 'incident':
                    vm.pageTitle = 'incident support';
                    vm.caseDetails.radios[0].selectedValue = '1 day';
                    break;
                case 'pro-active':
                    vm.pageTitle = 'pro-active support';
                    vm.caseDetails.radios[0].selectedValue = 'Immediate';
                    break;
                case 'on-demand':
                    vm.pageTitle = 'on-demand pros';
                    vm.caseDetails.radios[0].selectedValue = '4 hrs'
                    break;
                default:
                    vm.pageTitle = 'connect now';
                    break;
            }
        }

        function submitForm() {
            if (vm.isAuthenticated()) {
                $state.go('case');
            } else {
                LoginService.open();
            }
        }
    }
})();

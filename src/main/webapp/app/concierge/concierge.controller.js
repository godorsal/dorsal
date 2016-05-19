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
        vm.startChat = startChat;
        vm.productDetailInputComplete = false;
        vm.showChat = false;
        vm.chatName = '';
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
                                    description: 'Version',
                                    types: [
                                        {
                                            label: '',
                                            value: '',
                                            type: 'field'
                                        },
                                        {
                                            label: 'No version',
                                            value: 'na'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Environment',
                                    types: [
                                        {
                                            label: 'VMware',
                                            value: 'VMware'
                                        },
                                        {
                                            label: 'Open Stack',
                                            value: 'Open Stack'
                                        },
                                        {
                                            label: 'bare metal',
                                            value: 'bare metal'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Cluster Type',
                                    types: [
                                        {
                                            label: 'Tungsten Percona cluster',
                                            value: 'Tungsten Percona cluster'
                                        },
                                        {
                                            label: 'none',
                                            value: 'none'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Connectivity',
                                    types: [
                                        {
                                            label: 'timeout',
                                            value: 'timeout'
                                        },
                                        {
                                            label: 'connection drop',
                                            value: 'connection drop'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Performance',
                                    types: [
                                        {
                                            label: 'Slow queries',
                                            value: 'Slow queries'
                                        },
                                        {
                                            label: 'HighCPU/mem',
                                            value: 'HighCPU/mem'
                                        },
                                        {
                                            label: 'Query time out',
                                            value: 'Query time out'
                                        }
                                    ],
                                    selectedValue: ''
                                }
                            ]
                        },
                        {
                            label: 'PostgreSQL',
                            value: 'PostgreSQL',
                            incidentTypes: [
                                {
                                    description: 'Version',
                                    types: [
                                        {
                                            label: '',
                                            value: '',
                                            type: 'field'
                                        },
                                        {
                                            label: 'No version',
                                            value: 'na'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Environment',
                                    types: [
                                        {
                                            label: 'VMware',
                                            value: 'VMware'
                                        },
                                        {
                                            label: 'Open Stack',
                                            value: 'Open Stack'
                                        },
                                        {
                                            label: 'bare metal',
                                            value: 'bare metal'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Cluster Type',
                                    types: [
                                        {
                                            label: 'Tungsten Percona cluster',
                                            value: 'Tungsten Percona cluster'
                                        },
                                        {
                                            label: 'none',
                                            value: 'none'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Connectivity',
                                    types: [
                                        {
                                            label: 'timeout',
                                            value: 'timeout'
                                        },
                                        {
                                            label: 'connection drop',
                                            value: 'connection drop'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Performance',
                                    types: [
                                        {
                                            label: 'Slow queries',
                                            value: 'Slow queries'
                                        },
                                        {
                                            label: 'HighCPU/mem',
                                            value: 'HighCPU/mem'
                                        },
                                        {
                                            label: 'Query time out',
                                            value: 'Query time out'
                                        }
                                    ],
                                    selectedValue: ''
                                }
                            ]
                        },
                        {
                            label: 'MongoDB',
                            value: 'MongoDB',
                            incidentTypes: [
                                {
                                    description: 'Version',
                                    types: [
                                        {
                                            label: '',
                                            value: '',
                                            type: 'field'
                                        },
                                        {
                                            label: 'No version',
                                            value: 'na'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Environment',
                                    types: [
                                        {
                                            label: 'VMware',
                                            value: 'VMware'
                                        },
                                        {
                                            label: 'Open Stack',
                                            value: 'Open Stack'
                                        },
                                        {
                                            label: 'bare metal',
                                            value: 'bare metal'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Cluster Type',
                                    types: [
                                        {
                                            label: 'Tungsten Percona cluster',
                                            value: 'Tungsten Percona cluster'
                                        },
                                        {
                                            label: 'none',
                                            value: 'none'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Connectivity',
                                    types: [
                                        {
                                            label: 'timeout',
                                            value: 'timeout'
                                        },
                                        {
                                            label: 'connection drop',
                                            value: 'connection drop'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Performance',
                                    types: [
                                        {
                                            label: 'Slow queries',
                                            value: 'Slow queries'
                                        },
                                        {
                                            label: 'HighCPU/mem',
                                            value: 'HighCPU/mem'
                                        },
                                        {
                                            label: 'Query time out',
                                            value: 'Query time out'
                                        }
                                    ],
                                    selectedValue: ''
                                }
                            ]
                        },
                        {
                            label: 'MariaDB',
                            value: 'MariaDB',
                            incidentTypes: [
                                {
                                    description: 'Version',
                                    types: [
                                        {
                                            label: '',
                                            value: '',
                                            type: 'field'
                                        },
                                        {
                                            label: 'No version',
                                            value: 'na'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Environment',
                                    types: [
                                        {
                                            label: 'VMware',
                                            value: 'VMware'
                                        },
                                        {
                                            label: 'Open Stack',
                                            value: 'Open Stack'
                                        },
                                        {
                                            label: 'bare metal',
                                            value: 'bare metal'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Cluster Type',
                                    types: [
                                        {
                                            label: 'Tungsten Percona cluster',
                                            value: 'Tungsten Percona cluster'
                                        },
                                        {
                                            label: 'none',
                                            value: 'none'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Connectivity',
                                    types: [
                                        {
                                            label: 'timeout',
                                            value: 'timeout'
                                        },
                                        {
                                            label: 'connection drop',
                                            value: 'connection drop'
                                        }
                                    ],
                                    selectedValue: ''
                                },
                                {
                                    description: 'Performance',
                                    types: [
                                        {
                                            label: 'Slow queries',
                                            value: 'Slow queries'
                                        },
                                        {
                                            label: 'HighCPU/mem',
                                            value: 'HighCPU/mem'
                                        },
                                        {
                                            label: 'Query time out',
                                            value: 'Query time out'
                                        }
                                    ],
                                    selectedValue: ''
                                }
                            ]
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
                    vm.caseDetails.radios[0].selectedValue = '4 hrs';
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

        function startChat(event) {
            event.preventDefault();
            if (vm.chatName){
                vm.showChat = true;
            }
        }
    }
})();

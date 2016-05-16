(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ConciergeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.getProducts = getProducts;
        vm.getIncidentTypes = getIncidentTypes;
        vm.removeIncidentType = removeIncidentType;
        vm.canShowProductDetails = canShowProductDetails;

        vm.caseDetails = {
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
                            label: 'Other',
                            value: 'Other',
                            incidentTypes: []
                        }
                    ],

                    selectedValue: '',
                    incidentTypeSelections: []
                }
            ]
        };

        vm.product = vm.caseDetails.radios.filter(function (o) {
            return o.id === 'product';
        })[0];


        $scope.$on('authenticationSuccess', function () {
            getAccount();
        });

        $scope.$watch('vm.product.selectedValue', function(newValue, oldValue){
            if (oldValue && oldValue !== newValue) {
                console.log(newValue);
                vm.product.incidentTypeSelections = [];
            }
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        function register() {
            $state.go('register');
        }

        function getProducts() {
            if (vm.product.selectedValue) {
                return vm.product.values.filter(function (o) {
                    return o.value === vm.product.selectedValue
                });
            }

            return vm.product.values;
        }


        function getIncidentTypes() {
            var incidentTypes = [];
            var incidentType;

            if (vm.product.selectedValue) {
                incidentTypes = vm.product.values.filter(function (o) {
                    return o.value === vm.product.selectedValue
                });
            }

            if (incidentTypes.length) {
                incidentType = incidentTypes[0].incidentTypes[vm.product.incidentTypeSelections.length];
            }


            return incidentType;
        }

        function removeIncidentType(type) {
            var incidentTypesLength = vm.product.incidentTypeSelections.length,
                index = vm.product.incidentTypeSelections.indexOf(type);

            if (index !== -1) {
                vm.product.incidentTypeSelections.splice(index, incidentTypesLength);
            }
        }

        function canShowProductDetails() {
            var canShow = false,
                hasIncidentTypes;

            if (vm.product.selectedValue) {
                canShow = true;

                hasIncidentTypes = vm.product.values.filter(function (o) {
                    return o.value === vm.product.selectedValue;
                })[0].incidentTypes.length;

            }

            return canShow && hasIncidentTypes;
        }
    }
})();

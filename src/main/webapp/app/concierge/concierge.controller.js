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
        vm.setProduct = setProduct;
        vm.getIncidentTypes = getIncidentTypes;
        vm.removeIncidentType = removeIncidentType;

        vm.incidentDataSelections = {
            product: '',
            incidentTypes: []
        };

        vm.incidentData = {
            label: 'Products',
            description: 'For which product would you like support?',
            selectedDescription: 'Incident Summary',
            products: [
                {
                    name: 'MySQL',
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
                    name: 'postgreSQL',
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
                }
            ]
        };


        $scope.$on('authenticationSuccess', function () {
            getAccount();
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
            if (vm.incidentDataSelections.product) {
                return vm.incidentData.products.filter(function (o) {
                    return o.name === vm.incidentDataSelections.product
                });
            }

            return vm.incidentData.products;
        }

        function setProduct(product) {
            if (vm.incidentDataSelections.product !== product.name) {
                vm.incidentDataSelections.product = product.name;
            } else {
                vm.incidentDataSelections.product = '';
                vm.incidentDataSelections.incidentTypes = [];
            }
        }

        function getIncidentTypes() {
            var incidentTypes = [];
            var incidentType;

            if (vm.incidentDataSelections.product) {
                incidentTypes = vm.incidentData.products.filter(function (o) {
                    return o.name === vm.incidentDataSelections.product
                });
            }

            if (incidentTypes.length) {
                incidentType = incidentTypes[0].incidentTypes[vm.incidentDataSelections.incidentTypes.length];
            }


            return incidentType;
        }

        function removeIncidentType(type) {
            var incidentTypesLength = vm.incidentDataSelections.incidentTypes.length,
                index = vm.incidentDataSelections.incidentTypes.indexOf(type);

            if (index !== -1) {
                vm.incidentDataSelections.incidentTypes.splice(index, incidentTypesLength);
            }
        }
    }
})();

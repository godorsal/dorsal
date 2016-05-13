(function() {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ConciergeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.getProducts = getProducts;

        vm.incidentDataSelections = {
            product: ''
        };

        vm.incidentData = {
            products: [
                {
                    name: 'MySQL',
                    incidentTypes: [
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
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'postgreSQL',
                    incidentTypes: [
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
                                }
                            ]
                        },
                    ]
                }
            ]
        };


        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
        function getProducts() {
            if (vm.incidentDataSelections.product) {
                console.log(vm.incidentDataSelections.product);
                return vm.incidentData.products.filter(function(o){return o.name === vm.incidentDataSelections.product});
            }

            return vm.incidentData.products;
        }
    }
})();

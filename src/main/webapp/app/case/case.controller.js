(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('CaseController', CaseController);

    CaseController.$inject = ['$scope', '$state'];

    function CaseController($scope, $state) {
        var vm = this;

        vm.init = init;
        vm.getHistory = getHistory;
        vm.getCurrentCase = getCurrentCase;

        vm.init();

        vm.placeHolderExpert = {
            name: 'John Smith',
            picture: 'content/images/John-Smith.jpg',
            contact: {
                email: 'jsmith@support.com',
                phone: '(707) 555-1212',
                skype: 'minatourpower'
            },
            score: 69,
            stars: 4,
            badges: [
                'fast',
                'efficient',
                'expert'
            ]
        };

        vm.cases = [
            {
                expert: vm.placeHolderExpert,
                details: {
                    id: 'MySQL - 101008',
                    user: 'Joe Doe',
                    status: 'Assigned',
                    lastUpdate: new Date(Date.parse('May 16, 2016')),
                    chatRoom: {
                        id: 'chat Case-05152016',
                        link: 'http://54.67.112.235:5000/#!/room/5739fcddc8e3b3c31381dbc2'
                    }
                }
            },
            {
                expert: vm.placeHolderExpert,
                details: {
                    id: 'MySQL - 101006',
                    user: 'Joe Doe',
                    status: 'Resolved',
                    lastUpdate:  new Date(Date.parse('May 12, 2016')),
                    chatRoom: {
                        id: 'chat Case-05152016',
                        link: 'http://54.67.112.235:5000/#!/room/5739fcddc8e3b3c31381dbc2'
                    }
                }
            },
            {
                expert: vm.placeHolderExpert,
                details: {
                    id: 'PostgreSQL - 101004',
                    user: 'Joe Doe',
                    status: 'Resolved',
                    lastUpdate: new Date(Date.parse('May 5, 2016')),
                    chatRoom: {
                        id: 'chat Case-05152016',
                        link: 'http://54.67.112.235:5000/#!/room/5739fcddc8e3b3c31381dbc2'
                    }
                }
            },
            {
                expert: vm.placeHolderExpert,
                details: {
                    id: 'MySQL - 101001',
                    user: 'Joe Doe',
                    status: 'Resolved',
                    lastUpdate:  new Date(Date.parse('April 1, 2016')),
                    chatRoom: {
                        id: 'chat Case-05152016',
                        link: 'http://54.67.112.235:5000/#!/room/5739fcddc8e3b3c31381dbc2'
                    }
                }
            }

        ];

        function getCurrentCase() {
            var cases = [];

            if (vm.cases.length > 1) {
                cases = vm.cases.slice(0, 1);
            }

            return cases;
        }

        function getHistory() {
            var history = [];

            if (vm.cases.length > 1) {
                history = vm.cases.slice(1, vm.cases.length);
            }

            return history;
        }


        function init(){

        }
    }
})();

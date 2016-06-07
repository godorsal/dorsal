(function () {
    'use strict';

    angular
        .module('dorsalApp')
        .controller('ConciergeController', ['$rootScope', '$scope', '$uibModal', '$location', 'MSG', 'ChatRoomsService', 'ChatService', 'SimpleModalService', 'ConciergeService', ConciergeController]);

    ConciergeController.$inject = ['$rootScope', '$scope', '$state', 'LoginService', 'Principal', 'ConciergeService', '$translate', '$http', '$location', 'MSG', 'ChatRoomsService', 'ChatService', 'SimpleModalService', 'toastr'];

    function ConciergeController($scope, $state, LoginService, Principal, ConciergeService, $translate, $http) {
        var vm = this;

        vm.init = init;
        vm.submitForm = submitForm;
        vm.startChat = startChat;
        vm.updatePageTitle = updatePageTitle;
        vm.productDetailInputComplete = false;
        vm.showChat = false;
        vm.chatName = '';
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.product = null;
        vm.caseDetails = {
            summary: '',
            description: '',
            radios: []
        };

        // Watch for changes on the product's selected value property and clear out incidentTypeSelections on change
        $scope.$watch('vm.product.selectedValue', function(newValue, oldValue){
            if (oldValue && oldValue !== newValue) {
                vm.product.incidentTypeSelections = [];
                vm.productDetailInputComplete = false;
            }
        });

        /**
         * Initialize the controller's data.
         */
        function init(){
          ConciergeService.get(function(data){
              vm.caseDetails = data[0] || [];

              // Store a shortcut reference to the product object
              vm.product = vm.caseDetails.radios.filter(function (o) {
                  return o.id === 'product';
              })[0];

              vm.updatePageTitle();
          });
            vm.pageTitle = '';
            vm.person = {
              firstName: '',
              lastName: ''
            };

            vm.roomInfo = {}
            vm.phrases = [];

            vm.joined = false;
            vm.message = '';

            vm.notify = function (type, message) {
              if (type === 'say') {
                var name = (message.from === vm.person.id) ? vm.person.firstName : 'Concierge';

                $scope.$apply(function() {
                    vm.phrases.push({message: message.message, username: name});
                });
                //ChatRoomsService.formatMessage(message.message, name);
              }
              else if (type === 'welcome') {
                $scope.$apply(function() {
                    // vm.phrases.push({message: MSG.WelcomeChatGuest1 + vm.person.firstName + MSG.WelcomeChatGuest2, username: 'Administrator'});
                });
                //ChatRoomsService.formatMessage(MSG.WelcomeChatGuest1 + vm.person.firstName + MSG.WelcomeChatGuest2, 'Administrator');
              }
            }
            vm.post = function () {
              ChatService.post(vm.roomInfo.room, vm.message);
              vm.message = '';
            }
            vm.join = function () {
              ChatService.connect(vm.person, vm.notify, function (error, info) {
                if (error) {
                  toastr.error('Failed to connect ' + error, 'Error');
                  return;
                }
                vm.person.id = info.data.id;
                var roomName = ChatService.makeRoomName(vm.person);
                ChatService.createChatRoom(roomName, vm.person, function (response) {
                    vm.joined = true;
                    vm.roomInfo = response.room;
                    console.log("RC", $scope.rc.phrases);
                    //console.log('--- connected ' + JSON.stringify(vm.roomInfo));
                })
              })
            };
            // Make a call to get the initial data.
        }

        /**
         * Updates the page title to match the params *type* data
         */
        function updatePageTitle () {
            switch ($state.params.type) {
                case 'incident':
                    vm.pageTitle = $translate.instant('concierge.pageTitles.incident');
                    vm.caseDetails.radios[0].selectedValue = '4 hrs';
                    break;
                case 'pro-active':
                    vm.pageTitle = $translate.instant('concierge.pageTitles.proActive');
                    vm.caseDetails.radios[0].selectedValue = 'this week';
                    break;
                case 'on-demand':
                    vm.pageTitle = $translate.instant('concierge.pageTitles.onDemand');
                    vm.caseDetails.radios[0].selectedValue = '1 day';
                    break;
                default:
                    vm.pageTitle = $translate.instant('concierge.pageTitles.connect');
                    break;
            }
        }

        /**
         * Submits the form, or opens the login dialog if the user isn't logged in.
         */
        function submitForm() {
            if (vm.isAuthenticated()) {
                $state.go('case');
            } else {
                LoginService.open();
            }
        }

        /**
         * Toggles the chat display if the user provided a chat name.
         * @param event
         */
        function startChat(event) {
            event.preventDefault();
            // if (vm.chatName){
                vm.showChat = true;
            // }
        }

        // Call to initialize the controller.
        vm.init();
    }
})();

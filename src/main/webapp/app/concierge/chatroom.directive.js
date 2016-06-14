(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .directive('chatroom', chatroom);

    function chatroom($translate, $locale, tmhDynamicLocale) {
        var controller = ['$rootScope', '$scope', '$uibModal', '$location', 'MSG', 'ChatRoomsService', 'ChatService', 'SimpleModalService', 'toastr', function($rootScope, $scope, $uibModal, $location, MSG, ChatRoomsService, ChatService, SimpleModalService, toastr){
            var vm = this;

            vm.go = function (path) {
                $location.path(path);
            };

            vm.logout = function () {
                //AppService.logout();
            };

            vm.person = {
                name: '',
                // firstName: '',
                // lastName: ''
            };

            vm.roomInfo = {}
            vm.phrases = [];

            vm.joined = false;
            vm.message = '';

            vm.notify = function (type, message) {
                if (type === 'say') {
                    var name = (message.from === vm.person.id) ? vm.person.name : 'Concierge';
                    // var name = (message.from === vm.person.id) ? vm.person.firstName : 'Concierge';

                    $scope.$apply(function() {
                        vm.phrases.push({message: message.message, username: name});
                    });
                    //   ChatRoomsService.formatMessage(message.message, name);
                }
                else if (type === 'welcome') {
                    $scope.$apply(function() {
                        vm.phrases.push({message: MSG.WelcomeChatGuest1 + vm.person.name + MSG.WelcomeChatGuest2, username: 'Administrator'});
                        // vm.phrases.push({message: MSG.WelcomeChatGuest1 + vm.person.firstName + MSG.WelcomeChatGuest2, username: 'Administrator'});
                    });
                    //   ChatRoomsService.formatMessage(MSG.WelcomeChatGuest1 + vm.person.firstName + MSG.WelcomeChatGuest2, 'Administrator');
                }
            }

            vm.post = function () {
                ChatService.post(vm.roomInfo.room, vm.message);
                vm.message = '';
            }

            vm.join = function () {
                console.log("Join?");
                ChatService.connect(vm.person, vm.notify, function (error, info) {
                    if (error) {
                        toastr.error('Failed to connect ' + error, 'Error');
                        return;
                    }
                    vm.person.id = info.data.id;
                    var roomName = vm.person.name;
                    // var roomName = ChatService.makeRoomName(vm.person);
                    ChatService.createChatRoom(roomName, vm.person, function (response) {
                        vm.joined = true;
                        vm.roomInfo = response.room;
                        console.log("RESP", response);
                        //console.log('--- connected ' + JSON.stringify(vm.roomInfo));
                    })
                })
            };
        }]


        var directive = {
            restrict: 'E',
            templateUrl: 'app/concierge/chatroom.html',
            controller: controller,
            controllerAs: 'rc'
        };

        return directive;
    }
})();

(function() {
    'use strict';

    angular
    .module('dorsalApp')
    .directive('chatrooms', chatrooms);

    function chatrooms($translate, $locale, tmhDynamicLocale) {
        var controller = ['$rootScope', '$scope', '$uibModal', '$location', 'ChatRoomsService', 'ChatService', 'SimpleModalService', 'toastr', function($rootScope, $scope, $uibModal, $location, ChatRoomsService, ChatService, SimpleModalService, toastr){
            console.log(SimpleModalService);
            var vm = this;

            vm.rooms = [];
            vm.roomDetails = {};
            vm._isopen = {};
            vm.phrases = {};
            vm.messages = {};
            vm.person = {
                firstName: 'Concierge',
                lastName: ''
            };

            vm.go = function (path) {
                $location.path( path );
            };

            vm.logout = function() {
                //AppService.logout();
            };

            vm.refreshRooms = function() {
                ChatRoomsService.list()
                .then(function(data) {
                    vm.rooms = data;
                    console.log(data);
                });
            };

            vm.notify = function (type, message) {
                if (type === 'say') {
                    var name;
                    if ((message.from === vm.person.id)) {
                        name = vm.person.firstName;
                    }
                    else {
                        var member = vm.roomDetails[message.room].members[message.from];
                        name = (member) ? member.firstName : "Guest";
                    }

                    if(!vm.phrases[message.room])
                    vm.phrases[message.room] = [];

                    $scope.$apply(function() {
                        vm.phrases[message.room].push({message: message.message, username: name});
                    });
                    //ChatRoomsService.formatMessage(message.message, name);
                }
                else if (type === 'welcome') {
                    console.log('welcome concierge');
                    if(!vm.phrases[message.room])
                    vm.phrases[message.room] = [];

                    $scope.$apply(function() {
                        // vm.phrases[message.room].push({message: 'Welcome to the Guest room ' + message.room + '.', username: 'Administrator'});
                    });
                    //ChatRoomsService.formatMessage('Welcome to the ' + message.room + ' room.', 'Administrator');
                }
            }

            vm.post = function(roomName, index) {
                ChatService.post(vm.rooms[index].room , vm.messages[roomName]);
                $scope.crc.messages[roomName] = '';
            }

            vm.connect = function() {
                if (!ChatService.isConnected()) {
                    ChatService.connect({}, vm.notify, function (error, info) {
                        vm.person.id = info.data.id;
                        console.log('--- connected Concierge ');
                    })
                }
                else {
                    console.log('--- already connected');
                }
            };
            vm.connect();

            vm.updateRoom = function(update) {
                angular.forEach(vm.rooms, function(room) {
                    if (update.room === room.room) {
                        room.members = update.members;
                        room.membersCount = update.membersCount;
                        console.log('found: ' + room.room);
                        console.log('member: ' + vm.isMemberOfRoom(room.room));
                    }
                })
            }

            vm.join = function(rm, index) {
                ChatRoomsService.lookup(rm.room).then(function(room) {
                    if (room) {
                        console.log('--=== ROOM ' + JSON.stringify(room))
                        var info = {
                            room: rm.room,
                            firstName: vm.person.firstName,
                            lastName: vm.person.lastName,
                            id: vm.person.id
                        };
                        ChatService.addMemberToRoom(info, function (data) {
                            if (data.error) {
                                vm.post("You are already a member of this room")
                            }
                            else {
                                vm.roomDetails[room.room] = data.room;
                                vm.updateRoom(data.room);
                                if (!vm.phrases[room.room])
                                vm.phrases[room.room] = [];

                                // vm.phrases[room.room].push({
                                //   message: 'Welcome to the Guest room ' + room.room + '.',
                                //   username: 'Administrator'
                                // });

                                vm._isopen[rm.room] = true;
                                //ChatRoomsService.formatMessage('Welcome to the Guest room ' + room.room + '.', 'Administrator');
                            }
                        })
                    }
                })
            }

            vm.leave = function(rm) {
                var info = {
                    room: rm.room,
                    id: vm.person.id
                };

                ChatService.removeMemberFromRoom(info, function (data) {
                    vm.roomDetails[rm.room] = data.room;
                    vm.updateRoom(data.room);
                    vm._isopen[rm.room] = false;
                });
            };

            vm.deleteRoom = function(room) {
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Delete Room',
                    headerText: 'Delete Room',
                    bodyText: 'Are you sure you want to delete the selected room?'
                };

                SimpleModalService.showModal({}, modalOptions).then(function () {
                    ChatRoomsService.remove(room.room)
                    .then(function() {
                        vm.refreshRooms();
                        toastr.success('Room was deleted', 'Success');
                    });
                });
            };
            vm.refreshRooms();
            vm.isMemberOfRoom = function(roomName) {
                var room = vm.roomDetails[roomName];

                if (room && (room.membersCount > 0)) {
                    for (var key in room.members) {
                        if (vm.person.id && key === vm.person.id) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }]

        var directive = {
            restrict: 'E',
            templateUrl: 'app/admin/concierge/chatrooms.html',
            controller: controller,
            controllerAs: 'crc'
        };

        return directive;
    }
})();

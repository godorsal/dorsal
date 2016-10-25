(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .factory('DrslHipChatService', DrslHipChatService);

    DrslHipChatService.$inject = ['$state', '$rootScope', '$timeout', '$translate', 'Principal', 'ExpertAccount', 'Supportcase', 'toastr', '$http', '$localStorage', 'requestInterceptor', 'DrslMetadata', 'GlobalMetadata', '$window'];

    function DrslHipChatService($state, $rootScope, $timeout, $translate, Principal, ExpertAccount, Supportcase, toastr, $http, $localStorage, requestInterceptor, DrslMetadata, GlobalMetadata, $window) {
        var service = {};
        
        service.DrslMetadata = DrslMetadata;

        service.getCurrentUser = function(){
            Principal.identity()
            .then(function(res){
                if(res != null){
                    if(res.firstName == null){
                        service.currentUsername = res.login;
                    } else {
                        service.currentUsername = res.firstName + ' ' + res.lastName;
                    }
                }
            })
        }

        // Using the ManageRoomsToken, returns a list of all rooms
        service.getRooms = function(){
            var req = {
                method: 'GET',
                url: '/v2/room',
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[0]
                }
            }
            return $http(req);
        }
        service.getOneRoom = function(roomID){
            var req = {
                method: 'GET',
                url: '/v2/room/' + roomID,
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[0]
                }
            }
            return $http(req);
        }
        // With the GetMessagesToken, returns all messages in the provided room name or ID
        service.getMessages = function(roomID, maxResults){
            var req = {
                method: 'GET',
                url: '/v2/room/' + roomID + '/history?max-results=' + maxResults,
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[1]
                }
            }
            return $http(req, 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[0])
        }
        // Gets all the messages from a specific room to see if there's activity
        service.checkRoom = function(roomID){
            return service.getMessages(roomID, 100)
        }
        // Checks room every 5 minutes for activity, if number of messages in room is eqal to the maximum amount of messages queired, stop wating, if number of messages in room is more that what it was last time keep the room otherwise, delete it delete room
        service.waitForMessage = function(room, messages){
            service.waitingOnRoom = true;
            service.currentRoom = room;
            setTimeout(function () {
                service.checkRoom(room.id)
                .then(function(res){
                    if(res.data.items.length === 100){
                        service.waitingOnRoom = false;
                    } else if(res.data.items.length > messages){
                        service.waitForMessage(room.id)
                    } else {
                        service.deleteRoom(room.id)
                        service.waitingOnRoom = false;
                        toastr.warning(room.name + " was deleted", {
                            timeOut: 0
                        });
                        $rootScope.$emit('roomDeletion');
                    }
                })
            }, 5 * 60 * 1000);
        }
        // Make Hipchat chatroom using roomObjects name and topic
        service.makeRoom = function(roomObject){
            var url = '/v2/room';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    name: roomObject.name,
                    privacy: 'private',
                    topic: roomObject.topic,
                    guest_access: true
                },
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[2]
                }
            })
        }
        // Make a room with a name based on a timestamp
        service.makeConciergeRoom = function(){
            var timestamp = new Date();
            var roomName = "Concierge Chat Room: " + (timestamp.getMonth() + 1) + '/' + timestamp.getDate() + '/' + timestamp.getFullYear() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' +  timestamp.getSeconds();
            var url = 'http://localhost/v2/room';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    name: roomName,
                    privacy: 'private',
                    topic: "Concierge Chat",
                    guest_access: true
                },
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[2]
                }
            })
        }
        service.getRoom = function(roomID){
            var url = 'https://godorsal-dev.hipchat.com/v2/room/' + roomID
            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[0]
                }
            })
        }
        service.deleteRoom = function(roomID){
            var url = '/v2/room/' + roomID;
            return $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[2]
                }
            })
        }
        service.sendMessage = function(messageObject){
            var url = '/v2/room/' + messageObject.roomID +'/notification'
            return $http({
                method: 'POST',
                url: url,
                data: {
                    message: messageObject.message,
                    from: messageObject.from
                },
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy).split('#')[3]
                }
            })
        }
        service.clearRooms = function () {
            service.getRooms()
            .then(function(res){
                res.data.items.forEach(function(room){
                    if(room.name.split(':')[0] == "Concierge Chat Room"){
                        service.deleteRoom(room.id)
                    }
                })
                $rootScope.$emit('refreshRooms');
            })
        }
        service.clearChatRoom = function () {
            service.deleteRoom(service.currentRoom.id)
            service.currentUsername = '';
        }
        return service;
    }
})();

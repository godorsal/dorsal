(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .factory('DrslHipChatService', DrslHipChatService);

    DrslHipChatService.$inject = ['$state', '$rootScope', '$timeout', '$translate', 'Principal', 'ExpertAccount', 'Supportcase', 'toastr', '$http', '$localStorage', 'requestInterceptor', 'DrslMetadata', 'GlobalMetadata', '$window', '$sce'];

    function DrslHipChatService($state, $rootScope, $timeout, $translate, Principal, ExpertAccount, Supportcase, toastr, $http, $localStorage, requestInterceptor, DrslMetadata, GlobalMetadata, $window, $sce) {
        var service = {};

        service.DrslMetadata = DrslMetadata;
        service.maxResults = '5';
        // t9hEidVCkyNRDFHTDnW1qlaoTg2ClAsSFb5UMSFC
        // #K5RV7BL8mON1XvgStVxXasG6dWtHISRJSdFR2j8z
        // #OVoAYGsITVTIWnhOoqtCvZlXFMQOUsXQYiqKIC94
        // #5ZbVyVDbZroGAN3Rbwkua2qYTZyILxvowbDQLSKn
        // #o7fiSg2bnKuEiKRprF2acAXGIKsMu5MI8Xtk8EgX
        // dDloRWlkVkNreU5SREZIVERuVzFxbGFvVGcyQ2xBc1NGYjVVTVNGQyNLNVJWN0JMOG1PTjFYdmdTdFZ4WGFzRzZkV3RISVNSSlNkRlIyajh6I09Wb0FZR3NJVFZUSVduaE9vcXRDdlpsWEZNUU9Vc1hRWWlxS0lDOTQjNVpiVnlWRGJacm9HQU4zUmJ3a3VhMnFZVFp5SUx4dm93YkRRTFNLbg==
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
        service.getMessages = function(roomID, maxResults, currentCase, tokenNo){
            if(currentCase && currentCase.status.name === 'CLOSED'){
                var cached = true;
                maxResults = '1000';
            } else {
                var cached = false;
            }
            switch (tokenNo) {
                case 1:
                    var code = service.DrslMetadata.thingy;
                    break;
                case 3:
                    var code = service.DrslMetadata.thingy3;
                    break;
                case 5:
                    var code = service.DrslMetadata.thingy5;
                    break;
                default:
                    var code = service.DrslMetadata.thingy;
                    break;
            }
            var req = {
                method: 'GET',
                url: '/v2/room/' + roomID + '/history?max-results=' + maxResults,
                cache: cached,
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(code).split('#')[1]
                }
            }
            return $http(req, 'Bearer ' + code.split('#')[0])
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
        service.makeRoom = function(roomObject, tokenNo){
            var url = '/v2/room';
            switch (tokenNo) {
                case 1:
                    var code = service.DrslMetadata.thingy;
                    break;
                case 3:
                    var code = service.DrslMetadata.thingy3;
                    break;
                case 5:
                    var code = service.DrslMetadata.thingy5;
                    break;
                default:
                    var code = service.DrslMetadata.thingy;
                    break;
            }
            if(roomObject.hasExpert){
            return $http({
                method: 'POST',
                url: url,
                data: {
                    name: roomObject.name,
                    privacy: 'private',
                    topic: roomObject.topic,
                    guest_access: true,
                    owner_user_id: roomObject.expert
                },
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(code).split('#')[2]
                }
            })
        } else {
            return $http({
                method: 'POST',
                url: url,
                data: {
                    name: roomObject.name,
                    privacy: 'private',
                    topic: roomObject.topic,
                    guest_access: true,
                },
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(code).split('#')[2]
                }
            })
        }
    }
        // Make a room with a name based on a timestamp
        service.makeConciergeRoom = function(tokenNo){
            var timestamp = new Date();
            var roomName = "Concierge Chat Room: " + (timestamp.getMonth() + 1) + '/' + timestamp.getDate() + '/' + timestamp.getFullYear() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' +  timestamp.getSeconds();
            switch (tokenNo) {
                case 1:
                    var code = service.DrslMetadata.thingy;
                    break;
                case 3:
                    var code = service.DrslMetadata.thingy3;
                    break;
                case 5:
                    var code = service.DrslMetadata.thingy5;
                    break;
                default:
                    var code = service.DrslMetadata.thingy;
                    break;
            }
            return $http({
                method: 'POST',
                url: '/v2/room',
                data: {
                    name: roomName,
                    privacy: 'private',
                    topic: "Concierge Chat",
                    guest_access: true
                },
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(code).split('#')[2]
                }
            })
        }
        service.getRoom = function(roomID, tokenNo){
            var url = '/v2/room/' + roomID
            switch (tokenNo) {
                case 1:
                    var code = service.DrslMetadata.thingy;
                    break;
                case 3:
                    var code = service.DrslMetadata.thingy3;
                    break;
                case 5:
                    var code = service.DrslMetadata.thingy5;
                    break;
                default:
                    var code = service.DrslMetadata.thingy;
                    break;
            }
            return $http({
                method: 'GET',
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(code).split('#')[0]
                }
            })
        }
        service.deleteRoom = function(roomID, tokenNo){
            var url = '/v2/room/' + roomID;
            switch (tokenNo) {
                case 1:
                    var code = service.DrslMetadata.thingy;
                    break;
                case 3:
                    var code = service.DrslMetadata.thingy3;
                    break;
                case 5:
                    var code = service.DrslMetadata.thingy5;
                    break;
                default:
                    var code = service.DrslMetadata.thingy;
                    break;
            }
            return $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(code).split('#')[2]
                }
            })
        }
        service.archiveRoom = function(roomData){
            var url = '/v2/room/' + roomData.id;
            return $http({
                method: 'PUT',
                url: url,
                data: {
                    is_archived: true,
                    name: roomData.name,
                    privacy: roomData.privacy,
                    // is_guest_accessible: false,
                    topic: roomData.topic,
                    owner: roomData.owner
                },
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(service.DrslMetadata.thingy2)
                }
            })
        }
        service.sendMessage = function(messageObject, tokenNo){
            var url = '/v2/room/' + messageObject.roomID +'/notification'
            switch (tokenNo) {
                case 1:
                    var code = service.DrslMetadata.thingy;
                    break;
                case 3:
                    var code = service.DrslMetadata.thingy3;
                    break;
                case 5:
                    var code = service.DrslMetadata.thingy5;
                    break;
                default:
                    var code = service.DrslMetadata.thingy;
                    break;
            }
            return $http({
                method: 'POST',
                url: url,
                data: {
                    message: messageObject.message,
                    from: messageObject.from,
                    message_format: "text"
                },
                headers: {
                    'Authorization': 'Bearer ' + $window.atob(code).split('#')[3]
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
        $rootScope.$on('logoutDeleteConciergeRoom', function () {
            if(service.currentRoom){
                service.deleteRoom(service.currentRoom.id);
                service.waitingOnRoom = false;
            }
            service.currentUsername = null;
        })
        $rootScope.$on('authenticationSuccess', function () {
            if(service.currentUsername){
                service.getCurrentUser();
            }
        })
        service.magicMessageParser = function (messages) {
            return messages.forEach(function(message){
                var arrayMessage = message.message.split(' ');
                arrayMessage.map(function(word, index){
                    if (checkImg(word)) {
                        arrayMessage.splice(index, 1, '<a target="_blank" href=' + word + '>' + '<img src=' + word + ' alt="" class="drsl-hipchat-message-image-thumbnail"/>' + '</a>');
                    } else if(checkHTTP(word)){
                        arrayMessage.splice(index, 1, '<a target="_blank" href=' + word.replace(/\/$/, "") + '>' + word + '</a>');
                    } else if (checkCom(word)) {
                        arrayMessage.splice(index, 1, '<a target="_blank" href=http://' + word + '>' + word + '</a>');
                    } else if(index === 0 && word[0] === "@"){
                        arrayMessage.splice(index, 1);
                    }
                })
                if(message.type === 'notification'){
                    message.displayName = message.from.split('· ')[1];
                } else if(typeof message.from == "object") {
                    message.displayName = message.from.name;
                } else {
                    message.displayName = message.from;
                }
                message.formattedMessage = $sce.trustAsHtml(arrayMessage.join(' '));
                $sce.trustAsHtml(arrayMessage.join(' '));
            })
        }
        function checkCom(word){
            var splitWord = word.split('.')
            switch (splitWord[splitWord.length-1]) {
                case "com":
                return true;
                break;
                case "net":
                return true;
                break;
                case "org":
                return true;
                break;
                case "int":
                return true;
                break;
                case "edu":
                return true;
                break;
                case "gov":
                return true;
                break;
                case "mil":
                return true;
                break;
                default:
                return false;
            }
        }
        function checkImg(word){
            var splitWord = word.split('.')
            switch (splitWord[splitWord.length-1]) {
                case "png":
                return true;
                break;
                case "jpg":
                return true;
                break;
                case "jpeg":
                return true;
                break;
                case "gif":
                return true;
                break;
                default:
                return false;
            }
        }
        function checkHTTP(word){
            switch (word.split(':')[0]) {
                case "http":
                return true;
                break;
                case "https":
                return true;
                break;
                default:
                return false;
            }
        }


        return service;
    }
})();

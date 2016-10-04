(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .factory('DrslHipChatService', DrslHipChatService);

    DrslHipChatService.$inject = ['$state', '$rootScope', '$timeout', '$translate', 'Principal', 'ExpertAccount', 'Supportcase', 'toastr', '$http', '$localStorage', 'requestInterceptor'];

    function DrslHipChatService($state, $rootScope, $timeout, $translate, Principal, ExpertAccount, Supportcase, toastr, $http, $localStorage, requestInterceptor) {
        var service = {};
        var ManageRoomsToken = 't9hEidVCkyNRDFHTDnW1qlaoTg2ClAsSFb5UMSFC';
        var GetMessagesToken = 'Bearer K5RV7BL8mON1XvgStVxXasG6dWtHISRJSdFR2j8z';
        var MakeRoomToken = 'Bearer OVoAYGsITVTIWnhOoqtCvZlXFMQOUsXQYiqKIC94';
        var SendMessageToken = 'Bearer 5ZbVyVDbZroGAN3Rbwkua2qYTZyILxvowbDQLSKn';

        service.getRooms = function(){
            return $http.get('http://localhost/v2/room?auth_token=' + ManageRoomsToken)
        }
        service.getMessages = function(roomID, maxResults){
            var req = {
                method: 'GET',
                url: 'http://localhost/v2/room/' + roomID + '/history?max-results=' + maxResults,
                headers: {
                    'Authorization': GetMessagesToken
                }
            }
            return $http(req, GetMessagesToken);
        }
        service.makeRoom = function(roomObject){
            var url = 'http://localhost/v2/room'
            return $http({
                method: 'POST',
                url: url,
                data: {
                    name: roomObject.name,
                    privacy: 'private',
                    topic: roomObject.topic
                },
                headers: {
                    'Authorization': MakeRoomToken
                }
            })
        }
        service.deleteRoom = function(roomID){
            var url = 'http://localhost/v2/room/' + roomID;
            return $http({
                method: 'DELETE',
                url: url,
                headers: {
                    'Authorization': MakeRoomToken
                }
            })
        }
        service.sendMessage = function(messageObject){
            var url = 'http://localhost/v2/room/' + messageObject.roomID +'/notification'
            return $http({
                method: 'POST',
                url: url,
                data: {
                    message: messageObject.message,
                    from: messageObject.from
                },
                headers: {
                    'Authorization': SendMessageToken
                }
            })
        }


        return service;
    }
})();

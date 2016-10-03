(function () {
    'use strict';

    angular
    .module('dorsalApp')
    .factory('DrslHipChatService', DrslHipChatService);

    DrslHipChatService.$inject = ['$state', '$rootScope', '$timeout', '$translate', 'Principal', 'ExpertAccount', 'Supportcase', 'toastr', '$http', '$localStorage', 'requestInterceptor'];

    function DrslHipChatService($state, $rootScope, $timeout, $translate, Principal, ExpertAccount, Supportcase, toastr, $http, $localStorage, requestInterceptor) {
        var service = {};
        var ManageRoomsToken = 't9hEidVCkyNRDFHTDnW1qlaoTg2ClAsSFb5UMSFC';
        // var GetMessagesToken = 'K5RV7BL8mON1XvgStVxXasG6dWtHISRJSdFR2j8z';
        var GetMessagesToken = 'Bearer K5RV7BL8mON1XvgStVxXasG6dWtHISRJSdFR2j8z';
        var MakeRoomToken = 'Bearer OVoAYGsITVTIWnhOoqtCvZlXFMQOUsXQYiqKIC94';
        var SendMessageToken = 'Bearer QNR2PwiFvBoVfHJZXs7SjU0ngGoRmr0jIXZqKeiR';

        service.getRooms = function(){
            return $http.get('http://localhost/v2/room?auth_token=' + ManageRoomsToken)
        }
        service.getMessages = function(roomID){
            var req = {
                method: 'GET',
                url: 'http://localhost/v2/room/' + roomID + '/history?max-results=5',
                headers: {
                    'Authorization': GetMessagesToken
                }
            }
            return $http(req, GetMessagesToken);
            // return $http(requestInterceptor.request(req, GetMessagesToken));
            // console.log(req);
            // return $http(req)
            // return $http.get('http://localhost/v2/room/3157792/history')
        }
        service.makeRoom = function(roomObject){
            var url = 'http://localhost/v2/room'
            return $http({
                method: 'POST',
                url: url,
                data: {
                    name: roomObject.name
                },
                headers: {
                    'Authorization': MakeRoomToken
                }
            })
        }
        service.sendMessage = function(messageObject){
            var url = 'http://localhost/v2/room/' + messageObject.roomID +'/message'
            return $http({
                method: 'POST',
                url: url,
                data: {
                    message: messageObject.message
                },
                headers: {
                    'Authorization': SendMessageToken
                }
            })
        }


        return service;
    }
})();

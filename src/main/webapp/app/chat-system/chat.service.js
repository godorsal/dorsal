(function () {
  'use strict';

  angular
    .module('dorsalApp')
    .service('ChatService', ['$http', '$log', '$rootScope', 'ServerService', ChatService]);

  /** @ngInject */
  function ChatService($http, $log, $rootScope, ServerService) {

    var service = {
      connect: connect,
      disconnect: disconnect,
      post: post,
      addMemberToRoom: addMemberToRoom,
      removeMemberFromRoom: removeMemberFromRoom,
      createChatRoom: createChatRoom,
      makeRoomName: makeRoomName,
      isConnected: isConnected
    };

    var client = null;

    return service;

    function isConnected() {
      return (client != null);
    }

    function connect(user, notify, callback) {
      // TODO: use options to configure localhost:8080
      client = new ActionheroClient;


      // Notification Handlers
      client.on('connected', function () {
        notify('connected');
      })

      client.on('disconnected', function () {
        notify('disconnected');
      })

      client.on('error', function (error) {
        notify('error');
      })

      client.on('reconnect', function () {
        notify('reconnect');
      })

      client.on('reconnecting', function () {
        notify('reconnecting');
      })


      client.on('alert', function (message) {
        alert(JSON.stringify(message));
        notify(message);
      })

      client.on('api', function (message) {
        alert(JSON.stringify(message));
        notify('api', message);
      })

      client.on('welcome', function (message) {
        notify('welcome', message);
      })

      client.on('say', function (message) {
        notify('say', message);
      })

      client.connect(function (error, details) {
        if (error != null) {
          callback(error, details);
        }
        else {
          if (!!details) {
              callback(null, details)
          }
          else {
            callback("no data", details)
          }
        }
      });
    }

    function disconnect() {
    }

    function post(room, message) {
      client.say(room, message);
    }

    function addMemberToRoom(info, callback) {
      client.action('chatrooms:addMemberToRoom', {info: info},
        function (data) {
          $rootScope.$apply(function() {
            callback(data);
          })
        })
    }

    function removeMemberFromRoom(info, callback) {
      client.action('chatrooms:removeMemberFromRoom', {info: info},
        function (data) {
          $rootScope.$apply(function() {
            callback(data);
          })
        })
    }

    function createChatRoom(room, member, callback) {
      var guest = {
        name: room,
        // name: room,
        firstName: member.name,
        // firstName: member.firstName,
        // lastName: member.lastName,
        id: client.id
      };
      client.action('chatrooms:createGuestRoom', {guest: guest},
        function (data) {
          $rootScope.$apply(function() {
            callback(data);
          })
        })
    }

    function makeRoomName(person) {
      return person.name;
    //   return person.name + '-' + person.lastName;
    }
  }
})();

//

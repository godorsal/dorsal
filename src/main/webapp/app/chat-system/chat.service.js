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

      console.log(client);
      // Notification Handlers
      client.on('connected', function () {
        console.log('connected!');
        notify('connected');
      })

      client.on('disconnected', function () {
        console.log('disconnected :(');
        notify('disconnected');
      })

      client.on('error', function (error) {
        console.log('error', error.stack);
        notify('error');
      })

      client.on('reconnect', function () {
        console.log('reconnect');
        notify('reconnect');
      })

      client.on('reconnecting', function () {
        console.log('reconnecting');
        notify('reconnecting');
      })

      // client.on('message',      function(message){ console.log(message) })

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
            console.log("--- null details")
            callback("no data", details)
          }
        }
      });
    }

    function disconnect() {
    }

    function post(room, message) {
      // console.log("*** SAY id: " + client.id);
      // console.log("*** SAY fp: " + client.fingerprint);
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

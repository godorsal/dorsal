(function() {
  'use strict';

  angular
    .module('dorsalApp')
    .service('ChatRoomsService', ['$http', '$log', 'ServerService', ChatRoomsService]);

  /** @ngInject */
  function ChatRoomsService($http, $log, ServerService) {

    var service = {
      lookup: lookup,
      list: list,
      create: create,
      join: join,
      remove: remove
    };

    return service;

    function lookup(room) {
      var url = ServerService.api('/chatrooms/lookup', room);
      return $http.get(url, ServerService.apiConfig())
        .then(complete, failure)

      function complete(response) {
        return response.data.room;
      }

      function failure(error) {
        $log.error('Failed to lookup Chatroom ' + angular.toJson(error.data, true));
        return { error: error };
      }
    }

    function list() {

      return $http.get(ServerService.api('/chatrooms/list'), ServerService.apiConfig())
        .then(complete, failure)

      function complete(response) {
        return response.data.rooms; //[{room: 'room-100'}, {room: 'room-101'}]
      }

      function failure(error) {
        $log.error('Failed for list Chatrooms ' + angular.toJson(error.data, true));
        return { error: error };
      }
    }

    function create(guest) {

      return $http.post(ServerService.api('/chatrooms/create-guest'), {guest: guest}, ServerService.apiConfig())
        .then(complete, failure)

      function complete(response) {
        return response.data.room;
      }

      function failure(error) {
        $log.error('Failed to create guest chatroom ' + angular.toJson(error.data, true));
        return { error: error };
      }
    }

    function join(username) {

      return $http.post(ServerService.api('/chatrooms/join'), {account: account}, ServerService.apiConfig())
        .then(complete, failure)

      function complete(response) {
        return response.data.room;
      }

      function failure(error) {
        $log.error('Failed to Join Chatroom ' + angular.toJson(error.data, true));
        return { error: error };
      }
    }

    function remove(room) {

      return $http.delete(ServerService.api('/chatrooms/delete', room), ServerService.apiConfig())
        .then(complete, failure)

      function complete(response) {
        return response.data.result;
      }

      function failure(error) {
        $log.error('Failed to delete Chatroom ' + angular.toJson(error.data, true));
        return { error: error };
      }
    }
  }
})();

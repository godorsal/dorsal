/*global _*/
(function() {
  'use strict';

  angular
    .module('dorsalApp')
    .service('ServerService', ['$log', 'MSG', '_', ServerService]);

  /** @ngInject */
  function ServerService($log, MSG, _) {
    var apiHttpConfig = {
      withCredentials: true
    };

    var appConfig = {
      'reCaptchaPublic': '<%= reCaptchaPublic %>',
      'apiPort': '4000', //'<%= apiPort %>',
      'rootPath': '' //'<%= rootPath %>',
    };

    // Public Interface
    var service = {
      api: api,
      apiConfig: apiConfig,
      logError: logError
    };
    return service;

    // Implementation
    function apiConfig() {
      return _.clone(apiHttpConfig);
    }

    function api(endPoint, pathParam, pathParam2, pathParam3, pathParam4) {
      var url = location.protocol + '//' + location.hostname + '/api' + endPoint;
      if (location.hostname === 'localhost') {
        url = location.protocol + '//' + location.hostname + ':' + appConfig.apiPort + '/api' + endPoint;
      }
      if (angular.isDefined(pathParam)) {
        url += '/' + pathParam;
      }
      if (angular.isDefined(pathParam2)) {
        url += '/' + pathParam2;
      }
      if (angular.isDefined(pathParam3)) {
        url += '/' + pathParam3;
      }
      if (angular.isDefined(pathParam4)) {
        url += '/' + pathParam4;
      }
      return url;
    }

    function logError(error, message) {
      if (!message) message = ""
      if (error.status == -1) {
        $log.error(message + MSG.SERVER_DOWN)
      }
      else if (error.data) {
        if (error.data && error.data.error)
          $log.error(error.status + " - " + message + ": " + error.data.error) //angular.toJson(error.data, true))
      }
    }
  }
})();

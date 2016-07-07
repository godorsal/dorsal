(function () {
	'use strict';

	angular
	.module('dorsalApp')
	.factory('Focus', Focus);

	Focus.$inject = ['$timeout', '$window'];

	function Focus ($timeout, $window) {
		return function(id){
			$timeout(function() {
				var element = $window.document.getElementById(id);
				if(element){
					console.log("WORKING!!!");
					element.focus();
				} else {
					console.log('GODANGIT');
				}
			});
		}
		// var service = $resource('api/users/:login', {}, {
		//     'query': {method: 'GET', isArray: true},
		//     'get': {
		//         method: 'GET',
		//         transformResponse: function (data) {
		//             data = angular.fromJson(data);
		//             return data;
		//         }
		//     },
		//     'save': { method:'POST' },
		//     'update': { method:'PUT' },
		//     'delete':{ method:'DELETE'}
		// });

		// return service;
	}
})();

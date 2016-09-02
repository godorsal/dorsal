(function () {
	'use strict';

	angular
	.module('dorsalApp')
	.controller('ConciergeAdminController', ConciergeController);

	ConciergeController.$inject = ['$rootScope', '$scope', '$state', 'Principal', '$translate', '$http', 'toastr', 'DrslMetadata', 'GlobalMetadata'];

	function ConciergeController($rootScope, $scope, $state, Principal, $translate, $http, toastr, DrslMetadata, GlobalMetadata) {
		var vm = this;
		GlobalMetadata.query(function (result) {
			toObject(result);
		})
		function toObject(arr) {
			var rv = {};
			for (var i = 0; i < arr.length; ++i){
				rv[arr[i].name] = arr[i];
			}
			vm.conciergeAvailableForChat = rv.conciergeAvailableForChat;
			vm.conciergeURL = rv.conciergeChatUrl;
			vm.conciergeAvailable = rv.conciergeAvailable;
			isAvailable();
		}
		vm.setConcierge = setConcierge;

		function setConcierge(){
			vm.conciergeAvailable.value = vm.setAvailable;
			GlobalMetadata.update(vm.conciergeAvailableForChat, onSaveSuccess, onSaveError)
			GlobalMetadata.update(vm.conciergeURL, onSaveSuccess, onSaveError)
			GlobalMetadata.update(vm.conciergeAvailable, onSaveSuccess, onSaveError)
		}
		function onSaveSuccess(results){
			console.log(results);
		}
		function onSaveError(results){
			console.log(results);
		}
		function isAvailable(){
			if(vm.conciergeAvailable.value === 'true'){
				 vm.setAvailable = true;
			} else {
				 vm.setAvailable = false;
			}
		}
	}
})();

(function () {
	'use strict';

	angular
	.module('dorsalApp')
	.controller('ConciergeAdminController', ConciergeController);

	ConciergeController.$inject = ['$rootScope', '$scope', '$state', 'Principal', '$translate', '$http', 'toastr', 'DrslMetadata', 'GlobalMetadata'];

	function ConciergeController($rootScope, $scope, $state, Principal, $translate, $http, toastr, DrslMetadata, GlobalMetadata) {
		var vm = this;
		vm.globalData = {};
		GlobalMetadata.query(function (result) {
			toObject(result);
		})
		function toObject(arr) {
			for (var i = 0; i < arr.length; ++i){
				vm.globalData[arr[i].name] = arr[i];
			}
			vm.conciergeAvailableForChat = vm.globalData.conciergeAvailableForChat;
			vm.conciergeURL = vm.globalData.conciergeChatUrl;
			vm.conciergeAvailable = vm.globalData.conciergeAvailable;
			isAvailable();
		}
		vm.setConcierge = setConcierge;

		function setConcierge() {
			vm.conciergeAvailable.value = vm.setAvailable;
			if(vm.conciergeAvailableForChat == vm.globalData.conciergeAvailableForChat){
				GlobalMetadata.update(vm.conciergeAvailableForChat);
			}
			if(vm.conciergeURL == vm.globalData.conciergeChatUrl){
				GlobalMetadata.update(vm.conciergeURL);
			}
			if(vm.conciergeAvailable == vm.globalData.conciergeAvailable){
				GlobalMetadata.update(vm.conciergeAvailable);
			}
			onSaveSuccess();
		}
		function onSaveSuccess(results){
			toastr["success"]("Concierge Information Saved")
		}
		function onSaveError(results){
			toastr["error"]("Concierge Information Error")
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

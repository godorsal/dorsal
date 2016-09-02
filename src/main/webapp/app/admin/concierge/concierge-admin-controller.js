(function () {
	'use strict';

	angular
	.module('dorsalApp')
	.controller('ConciergeAdminController', ConciergeController);

	ConciergeController.$inject = ['toastr', 'GlobalMetadata'];

	function ConciergeController(toastr, GlobalMetadata) {
		var vm = this;
		vm.globalData = {};
		vm.tosting = false;

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
			vm.tosting = false;

			vm.conciergeAvailable.value = vm.setAvailable;
			if(vm.conciergeAvailableForChat == vm.globalData.conciergeAvailableForChat){
				GlobalMetadata.update(vm.conciergeAvailableForChat, onSaveSuccess, onSaveError);
			}
			if(vm.conciergeURL == vm.globalData.conciergeChatUrl){
				GlobalMetadata.update(vm.conciergeURL, onSaveSuccess, onSaveError);
			}
			if(vm.conciergeAvailable == vm.globalData.conciergeAvailable){
				GlobalMetadata.update(vm.conciergeAvailable, onSaveSuccess, onSaveError);
			}
		}
		function onSaveSuccess(results){
			if(!vm.tosting){
				vm.tosting = true;
				toastr["success"]("Concierge Information Saved")
			}
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

(function () {
	'use strict';

	angular
	.module('dorsalApp')
	.controller('ConciergeAdminController', ConciergeController);

	ConciergeController.$inject = ['toastr', 'GlobalMetadata', 'DrslHipChatService', '$rootScope'];

	function ConciergeController(toastr, GlobalMetadata, DrslHipChatService, $rootScope) {
		var vm = this;
		vm.globalData = {};
		vm.tosting = false;
		vm.concirgeRooms = [];
		vm.deleteRoom = deleteRoom;
		vm.clearRooms = clearRooms;
		vm.getRooms = getRooms;
		vm.getChatRooms = getChatRooms;

		getChatRooms();
		getRooms()

		function getRooms() {
			GlobalMetadata.query(function (result) {
				toObject(result);
			})
		}
		function getChatRooms() {
			DrslHipChatService.getRooms()
			.then(function(res){
				vm.concirgeRooms = [];
				res.data.items.forEach(function(room){
					if(room.name.split(':')[0] == "Concierge Chat Room"){
						DrslHipChatService.getOneRoom(room.id)
						.then(function (res) {
							var participants = [];
							res.data.participants.forEach(function (participant) {
								participants.push(participant.name);
							})
							res.data.participants = participants.join(',');
							vm.concirgeRooms.push(res.data);
						})
					}
				})
				checkRooms();
			}, function errorHandler(err) {
				console.log(err);
			})
		}
		function deleteRoom(id) {
			DrslHipChatService.deleteRoom(id)
			.then(function(res){
				toastr.success("ROOM DELETED")
				getChatRooms();
			})
		}
		function clearRooms() {
			DrslHipChatService.clearRooms();
			vm.concirgeRooms = [];
		}
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
		function checkRooms() {
			setTimeout(function () {
				getChatRooms();
				checkRooms()
			}, 5 * 60 * 1000);
		}
		$rootScope.$on('refreshRooms', function () {
			getChatRooms();
		})
	}
})();

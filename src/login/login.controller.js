/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Login Module controller
*/

(function(){
	'use strict';

	angular
		.module('app.login')
		.controller('loginController', loginController);

	loginController.$inject = ['userService'];

	/* @ngInject */
	function loginController(userService){
		var vo = this;
		vo.users = [];
		vo.users.selectedItem = {};
		vo.getUserData = getInputDetails;
		vo.getSelectedItem = getSelectedItem;
		//Method that will use service
		function getInputDetails(){
			return userService.getInputDetails('users')
					.then(getUserDataDetails);
		}
		//Promise method
		function getUserDataDetails(result){
			var usersInfo = result.data;
			vo.users = usersInfo;
		}

		function getSelectedItem(){
			console.log(vo.users.selectedItem);
		}
	}
})();
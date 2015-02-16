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
		vo.select = {
			'id' : '1',
			'name' : 'Please select'
		};
		vo.getUserData = getInputDetails;
		//Method that will use service
		function getInputDetails(){
			return userService.getInputDetails('users')
					.then(getUserDataDetails);
		}
		//Promise method
		function getUserDataDetails(result){
			var usersInfo = result.data;
			vo.users = usersInfo;
			//Inserting select row into array
			vo.users.splice(0, 1, vo.select);
		}
	}
})();
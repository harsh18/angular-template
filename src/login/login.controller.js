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
		vo.getUserData = getInputDetails;
		function getInputDetails(){
			return userService.getInputDetails('users')
					.then(getUserDataDetails);
		}
		function getUserDataDetails(data){
			console.log(data);
		}
	}
})();
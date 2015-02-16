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
		vo.selectedItem = {};
		vo.getUserData = getInputDetails;
		vo.getSelectedItem = getSelectedItem;
		vo.authenticate = authenticate;
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

		//Getting information on Change of Select dropdown
		function getSelectedItem(){
			console.log(vo.selectedItem);
		}

		//Submitting the data
		function authenticate(){
			//Before submission need to validate form
		//	vo.clientValidate = clientValidate;
			console.log('form submitted');
		}
	}
})();
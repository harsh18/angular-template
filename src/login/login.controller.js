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

	loginController.$inject = ['userService', '$location'];

	/* @ngInject */
	function loginController(userService, $location){
		var vo = this;
		vo.isValidForm = false;
		vo.users = [];
		//vo.selectedItem = {};
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
		function authenticate(isValid){
			//Before submission need to validate form
			console.log(isValid);
			if(isValid == false){
				console.log('false', 'validation fails');
				vo.isValidForm = true;
				return false;
			}
			console.log(vo.selectedItem);
			console.log('form submitted');
		}
	}
})();
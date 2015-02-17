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
			if(isValid == false){
				vo.isValidForm = true;
				return false;
			}
			vo.saveUserData = saveUserData();
			function saveUserData(){
				var user = JSON.stringify(vo.selectedItem);
				//Store in session storage
				sessionStorage.setItem('user', user);
				console.log('form submitted');	
				//Moving to dashboard
				$location.url('dashboard');
			}
		}
	}
})();
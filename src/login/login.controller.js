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
		var vo = this, sesInfo;
		vo.isValidForm = false;
		vo.users = [];

		//Constructor
		vo.executeSelf = executeSelf();
		
		//Form Submission -validation plus
		vo.authenticate = authenticate;

		function executeSelf(){
			//Getting Session Details
			sesInfo = JSON.parse(sessionStorage.getItem('user'));

			//Check Session
			var isSesAvail = sessionStorage.getItem('user');
			if(isSesAvail){
				console.log('Available');
				$location.url('dashboard');
			}

			//Get the registered user data
			userService.getInputDetails('users')
					.then(getUserDataDetails);

			function getUserDataDetails(result){
				var usersInfo = result.data;
				vo.users = usersInfo;
			}
		}

		function getUserData(){
			return userService.getInputDetails('users')
					.then(getUserDataDetails);
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
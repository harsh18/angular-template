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

	loginController.$inject = ['userService', '$location', 'sessionService', 'Restangular', '$http'];

	/* @ngInject */
	function loginController(userService, $location, sessionServicem, Restangular, $http){
		var vo = this, sesInfo;
		vo.isValidForm = false;
		vo.users = [];

		//Constructor
		//vo.executeSelf = executeSelf;
		
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

			/*testing*/
			//Restangular.all('json').getList().then(function(data){
			//	console.log(data);
			//});

			/*Testing http*/
			var urlGovt = "https://data.gov.in/api/datastore/resource.json?resource_id=6176ee09-3d56-4a3b-8115-21841576b2f6&api-key=325901bba439e85197a3da33f82a35f3",
      			urlTest = "http://vocab.nic.in/rest.php/country/json", req = {
				      	method : 'GET',
				      	url : urlTest
				      };

			$http(req).success(function(data){
				console.log(data);
			});	
		}		
		function getUserData(){
			return userService.getInputDetails('users')
					.then(getUserDataDetails);
		}

		//Submitting the data
		function authenticate(isValid){
			$location.url('dashboard');
			//Before submission need to validate form
			/*if(isValid == false){
				vo.isValidForm = true;
				return false;
			}*/
			vo.saveUserData = saveUserData();
			function saveUserData(){
				//var user = JSON.stringify(vo.selectedItem);
				//Store in session storage - Session service
				//sessionService.createSession(user);
				//sessionStorage.setItem('user', user);
				//console.log('form submitted');	
				//Moving to dashboard
				$location.url('dashboard');
			}
		}
	}
})();
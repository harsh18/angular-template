/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Session Service 
*/

(function(){
	'use strict';
	angular.module('core.module')
		.factory('sessionService', sessionService);

	sessionService.$inject = [];

	function sessionService(){
		var session = {
			//Create Session
			createSession : createSession,

			//Get session details
			getSessionData : getSessionData

		};
		return session;

		function createSession(user){
			sessionStorage.setItem('user', user);
		}

		function getSessionData(){
			var sessionData = sessionStorage.getItem('user');
			return sessionData;
		}
	}

})();
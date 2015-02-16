/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Main Application Service file - Get user 
*/

(function(){
	'use strict';
	angular.module('core.module')
		.factory('userService', userService);

	userService.$inject = ['Restangular'];

	function userService(Restangular){
		var user = {
			//Get informtaion 
			getInputDetails : getInputDetails
		} 

		return user;

		function getInputDetails(input){
			return Restangular.all(input).getList();
		}

	}	
})();
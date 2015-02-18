/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Order Service - Get and post
*/

(function(){
	'use strict';
	angular.module('core.module')
		.factory('orderService', orderService);

	orderService.$inject = ['Restangular'];

	function orderService(Restangular){
		var order = {
			//Get informtaion 
			getInputDetails : getInputDetails,

			//Post Input details
			postInputDetails : postInputDetails,

		} 

		return order;

		function getInputDetails(input){
			return Restangular.all(input).getList();
		}

		function postInputDetails(input ,order){
			console.log(order);
			return Restangular.all(input).post(order);
		}
	}	
})();
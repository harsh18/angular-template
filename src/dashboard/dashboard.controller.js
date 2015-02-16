/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Application Dashboard Controller
*/

(function(){
	'use strict';
	angular
		.module('app.dashboard')
			.controller('dashboardController', dashboardController);

		dashboardController.$inject = [];

		function dashboardController(){
			/* vo stands for virtual object */
			var vo = this;
		}
})();
/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Main Application Module
*/

(function(){
	'use strict';

	angular
		.module('loginApp')
		.controller('loginController', loginController);

	loginController.$inject = [];

	/* @ngInject */
	function loginController(){
		var login = this;
	}
})();
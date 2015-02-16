/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Main Application Module
*/

(function(){
	'use strict';
	angular.module('app', 
		/* Inject Core and dependent Modules here */
	[
		//Core application content injected here
		'core.module',

		//Features
		'app.login',
		'app.dashboard'
	]);

})();
/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Core Application config
*/

(function(){
	'use strict';
	var core = angular.module('core.module');

	core.config(appConfig);

	appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function appConfig($stateProvider, $urlRouterProvider){
		console.log($stateProvider);
		console.log($urlRouterProvider);
		//Otherwise Route - takes the url path
		$urlRouterProvider.otherwise("/dashboard");

		//Otherwise Rule - takes the function
		$urlRouterProvider.rule(otherWiseUrlCheck);

		otherWiseUrlCheck.$inject = ['$injector', '$location'];

		function otherWiseUrlCheck($injector, $location){
			//here we can check where user will be redirected - login or dashboard
			//$location.url - used to redirect to some states
			var url = '/login';
			console.log($location.url(url));
		}

		$stateProvider

			.state('login', {
				url : '/login',
				templateUrl : '/login/login.html',
			})		

			.state('dashboard', {
				url : '/dashboard',
				templateUrl : '/dashboard/dashboard.html'
			})
	}

})();
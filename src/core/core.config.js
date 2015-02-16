/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Core Application config
*/

(function(){
	'use strict';
	var core = angular.module('core.module');

	core.config(appConfig);

	appConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'RestangularProvider'];

	function appConfig($stateProvider, $urlRouterProvider, RestangularProvider){
		//Set base urls
		RestangularProvider.setBaseUrl('http://localhost:8080');

		//Otherwise Route - takes the url path
		$urlRouterProvider.otherwise("/login");

		//Otherwise Rule - takes the function
		//$urlRouterProvider.rule(otherWiseUrlCheck);

		otherWiseUrlCheck.$inject = ['$injector', '$location'];

		function otherWiseUrlCheck($injector, $location){
			//here we can check where user will be redirected - login or dashboard
			//$location.url - used to redirect to some states			
		}

		$stateProvider

			.state('login', {
				url : '/login',
				templateUrl : '/login/login.html',
				controller : 'loginController as vo'
			})		

			.state('dashboard', {
				url : '/dashboard',
				templateUrl : '/dashboard/dashboard.html',
				controller : 'dashboardController as vo'
			})
	}

})();
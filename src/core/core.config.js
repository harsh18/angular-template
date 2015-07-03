/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Core Application config
*/

(function(){
	'use strict';
	var core = angular.module('core.module');

	core.config(appConfig);

	appConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'RestangularProvider', '$httpProvider'];

	function appConfig($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider){
		//Set base urls
		//RestangularProvider.setBaseUrl('http://vocab.nic.in/rest.php/country/');
		//Set full response - will help in getting Http response code as well
		//RestangularProvider.setFullResponse(true);

		//Otherwise Route - takes the url path
		$urlRouterProvider.otherwise("/login");

		RestangularProvider.setDefaultHeaders({
			"Access-Control-Allow-Origin" : "*"
		  });

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
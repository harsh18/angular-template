/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Main Application Module
*/

(function(){
	'use strict';
	angular.module('app')
		.run(runOnRunTime);

		runOnRunTime.$inject = ['Restangular'];

	function runOnRunTime(Restangular){
		Restangular.setErrorInterceptor(errorCheck);

		errorCheck.$inject = ['response', 'deferred', 'responseHandlerc'];

		function errorCheck(response){
            if (response.status == 401) {
                console.log("Login required... ");
            } else if (response.status == 404) {
                console.log("Resource not available...");
            } else {
                console.log("Response received with HTTP error code: " + response.status );
            }
            return false; // stop the promise chain
		}
	}

})();
/*
#	Author : Harsh Kumar Lamba
#	Date : 6th Jan 2015
#	Description : Socket Service
*/

(function(){
	'use strict';
	angular.module('core.module')
		.factory('socketService', socketService);

	socketService.$inject = ['socketFactory'];

	function socketService(socketFactory){
		return socketFactory({
			ioSocket: io.connect('http://localhost:8080')
		});
	}

})();
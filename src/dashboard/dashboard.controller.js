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

		dashboardController.$inject = ['userService'];

		function dashboardController(userService){
			/* vo stands for virtual object */
			var vo = this, instruments;

			//Constructor
			vo.executeSelf = executeSelf();

			//Order Array object
			vo.orders = []; 

			//Getting orders from server
			//vo.getOrders = getOrders();

			//Creating orders 
			vo.createOrders = createOrders;

			function executeSelf(){
				console.log('Getting Instruments');
				//Calling Instruments service and store in instrument variable
				userService.getInputDetails('instruments').then(getInstrumentDetails);
				function getInstrumentDetails(data){
					console.log(data);
					instruments = data
				}

				console.log('Getting orders');
				//Calling Order Service and store in model orders
				userService.getInputDetails('orders').then(getOrderDetails);
				function getOrderDetails(data){
					var dataOrder = data;
					vo.orders = dataOrder;
					console.log(vo.orders);
				}

			}

			function createOrders(){
				console.log('Creating orders');
				var orderObj = {
				    "side": "Buy",
				    "symbol": "AAPL",
				    "quantity": 10000,
				    "limitPrice": 426.24,
				    "traderId": "AM"
				};
				//Post Order details
				userService.postInputDetails('orders', orderObj);
			}

		}
})();
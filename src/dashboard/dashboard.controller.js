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

		dashboardController.$inject = ['userService', '$location', 'sessionService', 'orderService'];

		function dashboardController(userService, $location, sessionService, orderService){
			/* vo stands for virtual object */
			var vo = this, instruments, sesInfo;

			//Constructor
			vo.executeSelf = executeSelf;

			//Order Array object
			vo.orders = []; 

			//Assets for bar chart - Model to be used for bar chart
			/*
			vo.assets = [
				{"asset_class":"US Stocks","market_value":586866,"percent_allocation":0.3,"percent_return":0.068},
				{"asset_class":"Foreign Stocks","market_value":293433,"percent_allocation":0.15,"percent_return":0.084},
				{"asset_class":"Emerging Markets","market_value":293433,"percent_allocation":0.15,"percent_return":0.127},
				{"asset_class":"Bonds","market_value":743364,"percent_allocation":0.38,"percent_return":0.022},
				{"asset_class":"Cash","market_value":39124,"percent_allocation":0.01,"percent_return":0}
			]*/

			//Getting orders from server
			vo.getOrders = getOrders;

			//Creating orders 
			vo.createOrders = createOrders;

			//Delete orders
			vo.deleteOrders = deleteOrders;

			//Destroy Session
			vo.destSession = destSession;

			function executeSelf(){
				//Getting Session Details
				sesInfo = JSON.parse(sessionService.getSessionData());

				//Check Session
				if(!sesInfo){
					console.log('Not available');
					$location.url('login');
					return false;
				}

				//Calling Instruments service and store in instrument variable
				userService.getInputDetails('instruments').then(getInstrumentDetails);
				function getInstrumentDetails(data){
					instruments = data
				}
				//Calling orders on load
				getOrders();

				//User Name
				vo.userName = sesInfo.name;
			}

			function getOrders(){
				//Calling Order Service and store in model orders
				orderService.getInputDetails('orders').then(getOrderDetails);
				function getOrderDetails(data){
					var dataOrder = data;
					vo.orders = dataOrder;
				}
			}

			function createOrders(){
				var strArr = ['Buy', 'Sell'], 
					orderObjArr = [], orderObj;

				for(var i=0; i<vo.numberOfOrders; i++){
					orderObj = ordrObjcreate();
					orderObjArr.push(orderObj);					
				}
				//Service to send data
				orderService.postInputDetails('orders', orderObjArr);

				function ordrObjcreate(){
					var ordrObj = {
						side : strArr[Math.round(Math.floor(getRandomArbitrary(0, strArr.length)))],
						symbol : instruments.data[Math.round(getRandomArbitrary(0, instruments.data.length))].symbol,
						quantity : Math.round(Math.random()*1000),
						limitPrice : (Math.random()*1000).toFixed(2),
						traderId : sesInfo.id
					}
					return ordrObj;
				}	
				console.log(orderObjArr);
				//vo.assets = orderObjArr;			
			}

			function getRandomArbitrary(min, max) {
			  return Math.random() * (max - min) + min;
			}

			function deleteOrders(){
				userService.deleteInputDetails('orders');
			}

			function destSession(){
				sessionService.destroySession();
				$location.url('login');
			}
		}
})();
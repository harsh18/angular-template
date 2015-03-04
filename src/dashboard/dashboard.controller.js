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

		dashboardController.$inject = ['$scope', 'userService', '$location', 'sessionService', 'orderService', 'socketService'];

		function dashboardController($scope, userService, $location, sessionService, orderService, socketService){
			/* vo stands for virtual object */
			var vo = this, instruments, sesInfo, socket;

			//Constructor
			vo.executeSelf = executeSelf;

			//Socket Config
			//socket = io.connect('http://localhost:8080');

			//Order Array object
			vo.orders = []; 

			//Assets for bar chart - Model to be used for bar chart
			
			vo.assets = [
				{"asset_class":"US Stocks","market_value":586866,"percent_allocation":0.3,"percent_return":0.068},
				{"asset_class":"Foreign Stocks","market_value":293433,"percent_allocation":0.15,"percent_return":0.084},
				{"asset_class":"Emerging Markets","market_value":293433,"percent_allocation":0.15,"percent_return":0.127},
				{"asset_class":"Bonds","market_value":743364,"percent_allocation":0.38,"percent_return":0.022},
				{"asset_class":"Cash","market_value":39124,"percent_allocation":0.01,"percent_return":0}
			]

			vo.assets = [
              {"id": 35, "quantity": 1000, "quantityPlaced": 450, "quantityExecuted" : 500},
              {"id": 36, "quantity": 5000, "quantityPlaced": 3000, "quantityExecuted" : 2000},
              {"id": 37, "quantity": 9090, "quantityPlaced": 2050, "quantityExecuted" : 5000},
              {"id": 38, "quantity": 4000, "quantityPlaced": 4500, "quantityExecuted" : 500},
              {"id": 39, "quantity": 5500, "quantityPlaced": 450, "quantityExecuted" : 4500}
            ];

			//Getting orders from server
			vo.getOrders = getOrders;

			//Creating orders 
			vo.createOrders = createOrders;

			//Delete orders
			vo.deleteOrders = deleteOrders;

			//Destroy Session
			vo.destSession = destSession;

			//###############
			//Socket - Events
			//###############
			//Order created
			socketService.on('orderCreatedEvent', orderCreatedEvent);

			//Order Placement
			socketService.on('placementCreatedEvent', placementCreatedEvent);

			//Order executed
			socketService.on('executionCreatedEvent', executionCreatedEvent);	

			//Delete orders
			socketService.on('allOrdersDeletedEvent', allOrdersDeletedEvent);		

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
				orderService.getInputDetails('orders').then(getOrderDetails, errorGetOrder);
				function getOrderDetails(data){
					var dataOrder = data;
					vo.orders = dataOrder;
				}
				function errorGetOrder(res){
				//	console.log('in', res);
					return false;
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
			//	console.log(orderObjArr);
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
			
			function orderCreatedEvent(data){
				vo.orders.push(data);
			}

			function placementCreatedEvent(data){
				console.log(data);
				angular.forEach(vo.orders, function (order,index) {
	                if (order.id == data.orderId) {
	                	vo.orders[index].quantityPlaced += data.quantityPlaced;
	                    vo.orders[index].status = data.status;
	                 }
	            });
			}

			function executionCreatedEvent(data){
				angular.forEach(vo.orders, function (order,index) {
	                if (order.id == data.orderId) { 
	                    vo.orders[index].quantityExecuted += data.quantityExecuted;
	                    vo.orders[index].executionPrice = data.executionPrice;
	                 }
              	});
			}

			function allOrdersDeletedEvent(){
				vo.orders = [];
			}
		}
})();
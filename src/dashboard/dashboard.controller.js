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

		dashboardController.$inject = ['userService', '$location'];

		function dashboardController(userService, $location){
			/* vo stands for virtual object */
			var vo = this, instruments, sesInfo;

			//Constructor
			vo.executeSelf = executeSelf();

			//User Name
			vo.userName = sesInfo.name;
			//Order Array object
			vo.orders = []; 

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
				sesInfo = JSON.parse(sessionStorage.getItem('user'));

				//Check Session
				var isSesAvail = sessionStorage.getItem('user');
				if(!isSesAvail){
					console.log('Not available');
					$location.url('login');
				}

				//Calling Instruments service and store in instrument variable
				userService.getInputDetails('instruments').then(getInstrumentDetails);
				function getInstrumentDetails(data){
					console.log('Instruments', data);
					instruments = data
				}
				//Calling orders on load
				getOrders();
			}

			function getOrders(){
				//Calling Order Service and store in model orders
				userService.getInputDetails('orders').then(getOrderDetails);
				function getOrderDetails(data){
					var dataOrder = data;
					vo.orders = dataOrder;
				}
			}

			function createOrders(){
				console.log('Creating orders');
				createOrdersObject();
			}

			//Create Order object with random values
			function createOrdersObject(){
				var instrumentObjLen = instruments.data.length, 
				numberOfOrders = vo.numberOfOrders,
				ranInstrumentNum,
				instruObj = {},
				orderObj = {},
				stringArr = ['Buy', 'Sell'],
				strArrPos;
				for (var i=0; i<numberOfOrders;i++){
					var quaObj, limiObj;
					ranInstrumentNum = getRoundNumber(getRandomArbitrary(0, instrumentObjLen));
					instruObj = instruments.data[ranInstrumentNum];
					strArrPos = getRoundNumber(getRandomArbitrary(0, stringArr.length));
					orderObj.side = stringArr[strArrPos];
					orderObj.symbol = instruObj.symbol;
					orderObj.quantity = parseInt(getRoundNumber(Math.random() * 1000));
					orderObj.limitPrice = (Math.random()*1000).toFixed(2);
					orderObj.tradeId = sesInfo.id;		//Hard coded tradeId need to get from session storage
					//Post Order details
					userService.postInputDetails('orders', orderObj);
				}
				function getRoundNumber(num){
					return Math.round(num);
				}
				function getRandomArbitrary(min, max) {
				  return Math.random() * (max - min) + min;
				}
			}

			function deleteOrders(){
				userService.deleteInputDetails('orders');
			}

			function destSession(){
				sessionStorage.clear();
				$location.url('login');
			}
		}
})();
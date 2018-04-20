var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./database');
var path = require('path');


router.get('/getOrders', function(req, res) {
	
	var getMyOrders = "SELECT co.order_id,co.order_status,co.order_amount,DATE_FORMAT(co.created_date,'%m/%d/%Y') as 'created_date',ci.item_id as 'product_id',i.item_name as 'product_name' FROM customer_orders as co, order_items as ci,items as i WHERE co.order_id = ci.order_id and ci.item_id = i.id and co.order_status='Processing' order by co.order_id desc";
	console.log("getMyOrders========================>"+getMyOrders);
	db.executeMyQuery(getMyOrders, function(err, results) {

		res.render('adminOrder', {
		    title: 'Orders',
		    myOrders:results
		  });
		
	});
});

router.get('/orderApprove/:orderId', function(req, res) {
	var orderId = req.params.orderId;
	var changeOrderStatus = "update customer_orders set order_status = 'Approved' where order_id = '"+orderId+"' and order_status='Processing'";
	console.log("changeOrderStatus========================>"+changeOrderStatus);
	db.executeMyQuery(changeOrderStatus, function(err, results) {

		res.redirect('/adminOrders/getOrders');
	});
});

router.get('/orderReject/:orderId', function(req, res) {
	var orderId = req.params.orderId;
	var changeOrderStatus = "update customer_orders set order_status = 'Rejected' where order_id = '"+orderId+"' and order_status='Processing'";
	console.log("changeOrderStatus========================>"+changeOrderStatus);
	db.executeMyQuery(changeOrderStatus, function(err, results) {

		res.redirect('/adminOrders/getOrders');
		
	});
});
module.exports = router;

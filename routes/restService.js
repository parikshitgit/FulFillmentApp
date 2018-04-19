var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./database');
var path = require('path');


router.post('/updateOrder', function(req, res) {
	
	var body = req.body;
	var orderId = body.orderId;
	var orderStatus = body.orderStatus;
	
	var changeOrderStatus = "update customer_orders set order_status = '"+orderStatus+"' where order_id = '"+orderId+"' and order_status='Processing'";
	db.executeMyQuery(changeOrderStatus, function(err, results) {
		var output={message:"Order status updated successfully"};
		db.makeResult(req,res,output);
	});
	
});
module.exports = router;

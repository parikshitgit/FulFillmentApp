var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./database');
var path = require('path');


router.get('/order/getAllAdminOrders', function(req, res) {
	
	var getMyOrders = "SELECT co.order_id,co.order_status,co.order_amount,DATE_FORMAT(co.created_date,'%m/%d/%Y') as 'created_date',ci.item_id as 'product_id',i.item_name as 'product_name' FROM customer_orders as co, order_items as ci,items as i WHERE co.order_id = ci.order_id and ci.item_id = i.id order by co.order_id desc";
	console.log("getMyOrders========================>"+getMyOrders);
	db.executeMyQuery(getMyOrders, function(err, results) {

		res.render('adminAllOrders', {
		    title: 'Orders',
		    myOrders:results
		  });
		
	});
});

module.exports = router;

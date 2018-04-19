var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./database');
var path = require('path');

router.get('/create', function(req, res) {
	console.log("========================>>>> create order form")
	var productItems = "SELECT * FROM items order by id";
	db.executeMyQuery(productItems, function(err, results) {

		res.render('createOrder', {
		    title: 'Create New Order',
		    products:results
		  });
		
	});
	
	 
});

router.get('/searchItem', function(req, res) {
	
	var searchTerm = req.query.term;
	//console.log("searchTerm========================>"+searchTerm);
	var productItems = "SELECT * FROM items WHERE id = '"+searchTerm+"' order by id";
	//console.log("productItems========================>"+productItems);
	db.executeMyQuery(productItems, function(err, results) {
		db.makeResult(req,res,results);
	});
});

router.get('/myOrders', function(req, res) {
	var session = req.session;
	var userId = session.userId;
	var getMyOrders = "SELECT co.order_id,co.order_status,co.order_amount,DATE_FORMAT(co.created_date,'%d/%m/%Y') as 'created_date',ci.item_id as 'product_id',i.item_name as 'product_name' FROM customer_orders as co, order_items as ci,items as i WHERE co.user_id='"+userId+"' and co.order_id = ci.order_id and ci.item_id = i.id order by co.order_id desc";
	console.log("getMyOrders========================>"+getMyOrders);
	db.executeMyQuery(getMyOrders, function(err, results) {

		res.render('myOrders', {
		    title: 'My Orders',
		    myOrders:results
		  });
		
	});
});

router.post('/placeOrder', function(req, res) {
	
	var body = req.body;
	var session = req.session;
	var product = body.product;
	var qty = body.qty;
	var price = body.price;
	var userId = session.userId;
	var orderAmount = (parseInt(qty)*parseFloat(price));
	var tax = 0;
	var netAmount = (orderAmount-tax);
	var datetime = new Date();
	var placeOrderQuery = "insert into customer_orders (user_id,order_status,order_amount,tax_amount,net_amount) values('"+userId+"','Processing','"+orderAmount+"','"+tax+"','"+netAmount+"')";
	//console.log("placeOrderQuery========================>"+placeOrderQuery);
	db.executeMyQuery(placeOrderQuery, function(err, results) {
		
		//console.log("results========================>"+JSON.stringify(results));
		placeOrderQuery = "insert into order_items (item_id,order_id,qty) values('"+product+"','"+results.insertId+"','"+qty+"')";
		console.log("order_items========================>"+placeOrderQuery);
		db.executeMyQuery(placeOrderQuery, function(err, results) {
			res.redirect('/order/myOrders');
		});
		
	});
});
module.exports = router;

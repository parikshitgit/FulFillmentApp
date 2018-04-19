var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./database');
var session = require('express-session');
var sess;
router.get('/', function(req, res){
	
	var message = '';
	var success_message = "";
    res.render('index', {
		    title: 'Login Form',
		    message: message,
		    success_message:success_message
		  });
	  
	
	
  
});

router.get('/signUp', function(req, res){
	
	var message = '';
	var success_message = "";
	  res.render('sign_up', {
		    title: 'Sign Up Form',
		    message: message,
		    success_message:success_message
		  });
	  
	
	

});

router.get('/logout',function(req,res){    
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.redirect('/');  
        }  
    });  

}); 

router.post('/addUser', function(req, res){
	var body = req.body;
	var first_name = body.firstName
	var last_name = body.last_name
	var username = body.loginId
	var email = body.email
	var password = body.password
	var rePassword = body.repassword
	var profile_type =1;
	console.log("first_name===================== "+first_name);
	console.log("email========================= "+email)
	console.log("password========================= "+password)
	console.log("rePassword========================= "+rePassword)
	var sql_find="SELECT * FROM users WHERE username='"+username+"'";
	var user_find_length =0
	db.executeMyQuery(sql_find, function(err, results) {
		console.log("results.length ==========================>"+results.length);
		
		
		
		if(results.length > 0){
			user_find_length =1
			var message = 'User Already Created, Please Enter different Login Id';
			var success_message = "";
			  res.render('sign_up', {
				    title: 'Sign Up Form',
				    message: message,
				    success_message:success_message
				  });
			  
		}
		else
			{
				var date = new Date();
				var sql = "INSERT INTO users (first_name, last_name, email, password,profile_type,username) VALUES ('"+first_name+"', '"+last_name+"', '"+email+"', '"+password+"', '"+profile_type+"', '"+username+"')";
				console.log("req==============>"+JSON.stringify(req.body));
				var checkUser = "select * from users where id = '"+body.id+"'";
				// Check if already exist
				db.executeMyQuery(sql, function(err, insertResults) {
					 console.log("Created Successfull "+insertResults);
					
					    var message = '';
						
						var success_message = 'User Created Successfull ID :'+username
						
						
					 res.redirect('/');
					
				});
			
			}
		
	});
	
	console.log("user_find_length ==========================>"+user_find_length);
	
	
	
});

router.post('/login', function(req, res){
	var body = req.body;
	var username = body.username
	var password = body.password
	console.log("username========================= "+username)
	var sql="SELECT * FROM users WHERE username='"+username+"' and password='"+password+"'";
	
	db.executeMyQuery(sql, function(err, results) {
		console.log("results==========================>"+JSON.stringify(results));
		if(results.length > 0){

			sess = req.session;
			sess.username; 
			sess.username=req.body.username;
			sess.userId = results[0].id;
			console.log("username====================="+sess.username);
			  
			var profile_type = results[0].profile_type;
			if(profile_type === 2){
				res.redirect('/adminOrders/getOrders');
			}else
			res.redirect('/order/myOrders');

		
			}else{
				console.log("User not found ====================="+results.length);
				var message = '';
				message = 'Wrong User Credentials.';
				var success_message = ''
				res.render('index', {
				    title: 'Login Form',
				    message: message,
				    success_message:success_message
				  });
				
		  }
		});
	
});




module.exports = router;


var express = require("express");
var app = express();

var mysql = require('mysql');


var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  //password: "sns",
  password: "",
  database: "customer_orders",
  connectionLimit: 10,
  supportBigNumbers: true
});




// execute Query
exports.executeMyQuery = function(query, callback) {

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(query, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};

// execute Query
exports.executeGetMyUser = function(userId, callback) {
	
	var sql = "SELECT * FROM user WHERE user_id = '"+userId+"'";
	 exports.executeMyQuery(sql, function(err, results) {
		if( results.length > 0 ){
			var user = results[0];
			userId = user.id;

			callback(userId);
		}

	
	 });
  
};

exports.makeResult =  function(req,res,results){

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.json(results);
}

/*var orm 	   =  	require('../orm.js');
var Sequelize  =    require('sequelize');
var customer = Sequelize.define('customer',orm.Customer);*/

var server = require('../server.js');
var customer = server.customer;

module.exports = function(app)
{
	app.get('/', function (req, res){
		console.log ('GET /');
		res.render('main.ejs', {page:"index.ejs"});
	});	
	
	app.get('/index', function (req, res){
		console.log ('GET /index');
		res.render('main.ejs', {page:"index.ejs"});
	});
	
	app.get('/viewCustomers', function (req, res){
		console.log ('GET /viewCustomers');
		
		customer.findAll()
		.then(function(customers){
 				console.log(customers[0].dataValues);
				res.render('main.ejs', {page:"viewCustomers", customers:customers});
 		});
 
		
	});
	
	app.post('/addCustomers', function (req, res){
		console.log(req.body);
		console.log ('POST /addCustomers');
		
		var person = customer.create( //customer.create({}); for one row at a time, customer.bulkCreate([{},{}]) for multiple rows
			{
				customerNumber:req.body.cusNum,
				firstName:req.body.fname,
				lastName:req.body.lname,
				address:req.body.address,
				email:req.body.email,
				phoneNumber:req.body.phone,
				customerStatus:req.body.cusStatus,
				bio:req.body.bio,
				photo:req.body.photo,
				adminNotes:req.body.notes}
		);
		customer.sync();
		
		res.render('main.ejs', {page:"addCustomers"});
	
	
	
	});
	
	app.get('/addCustomers', function (req, res){
		console.log ('GET /addCustomers');
		res.render('main.ejs', {page:"addCustomers"});
	});
}

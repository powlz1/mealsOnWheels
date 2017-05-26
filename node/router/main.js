/*var orm 	   =  	require('../orm.js');
var Sequelize  =    require('sequelize');
var customer = Sequelize.define('customer',orm.Customer);*/

var server = require('../server.js');
var customer = server.customer;
var mrCategory = server.mrCategory;
var mealR = server.mealR;

var socket = server.socket;
 
 socket.on('connection', function (AddUser_Server) {
	 console.log('socket connected');
 });

module.exports = function(app)
{
	app.get('/', function (req, res){
		console.log ('GET /');
		res.render('main.ejs', {page:"index"});
	});	
	
	app.get('/index', function (req, res){
		console.log ('GET /index');
		res.render('main.ejs', {page:"index"});
	});
	
	app.get('/viewCustomers', function (req, res){
		console.log ('GET /viewCustomers');
		
		customer.findAll()
		.then(function(customers){
				res.render('main.ejs', {page:"viewCustomers", customers:customers});
 		});
	});
	
	app.post('/addCustomers', function (req, res){
		console.log(req.body);
		console.log ('POST /addCustomers');
		
		

		customer.create( //customer.create({}); for one row at a time, customer.bulkCreate([{},{}]) for multiple rows
			req.body
		).then(function(customer){
			socket.emit('zak', customer);
			res.send(JSON.stringify({ customer: customer }));
			
		});
	});
	

	app.get('/addCustomer', function (req, res){
		console.log ('GET /addCustomer');
		mrCategory.findAll({include:[mealR]})
			.then(function(mrcats){
				res.render('main.ejs', {page:"addCustomer", mrcats:mrcats});
			});
	});

	app.get('/editCustomer/:customerID', function (req, res){
		console.log ('GET /addCustomers');
		var customerID = req.params.customerID;
		mrCategory.findAll({include:[mealR]})
			.then(function(mrcats){
				customer.findAll({
					where:{
						customerID:customerID
					}
				}).then(function(customers){
					res.render('main.ejs', {page:"addCustomer", mrcats:mrcats, customers:customers});
				});
			});
	});

	app.get('/mealOptions', function (req, res){
		console.log ('GET /mealOptions');
		mrCategory.findAll({include:[mealR]})
		.then(function(mrcats){
			res.render('main.ejs', {page:"mealOptions", mrcats:mrcats});
		});
	});

	app.post('/addNewMRCategory', function (req, res){
		console.log ('POST /addNewMRCategory');
		mrCategory.create(
			{
				category:req.body.newMRCat
			}
		).then(function(mrcat){
			res.send(JSON.stringify({ mrcat: mrcat }));
		});
	});

	app.post('/addNewMR', function (req, res){
		console.log ('POST /addNewMR');

		mrCategory.findAll({
			where:{
				mealRequirementCategoryID:req.body.categoryID
			}
		}).then(function(mrcat){
			mealR.create(
				{
					requirement:req.body.newMR,
					MRcategoryMealRequirementCategoryID:req.body.categoryID
				}
			).then(function(mr){
				res.send(JSON.stringify({ mr: mr }));
			});
		});
	});
}

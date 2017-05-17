/*var orm 	   =  	require('../orm.js');
var Sequelize  =    require('sequelize');
var customer = Sequelize.define('customer',orm.Customer);*/

var db = require('../db.js');
var customer = db.customer;
var mealRequirementCategory = db.mealRequirementCategory;
var mealRequirement = db.mealRequirement;
//var customerMR = db.customerMR;

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
		
		customer.findAll({include:[mealRequirement]})
		.then(function(customers){
			res.render('main.ejs', {page:"viewCustomers", customers:customers});
 		});
	});
	
	app.post('/addCustomers', function (req, res){
		console.log(req.body);
		console.log ('POST /addCustomers');

		customer.create( //customer.create({}); for one row at a time, customer.bulkCreate([{},{}]) for multiple rows
			req.body.customer
		).then(function(customer){
			mealRequirement.findAll({
				where:{
					id:req.body.mealRequirements
				}
			}).then(function(mealRequirements){
				customer.addMealRequirements(mealRequirements);
				res.send(JSON.stringify({ customer: customer }));
			})
		});
	});
	

	app.get('/addCustomer', function (req, res){
		console.log ('GET /addCustomer');
		mealRequirementCategory.findAll({include:[mealRequirement]})
			.then(function(mrcats){
				res.render('main.ejs', {page:"addCustomer", mrcats:mrcats});
			});
	});

	app.get('/editCustomer/:customerID', function (req, res){
		console.log ('GET /addCustomers');
		var customerID = req.params.customerID;
		mealRequirementCategory.findAll({include:[mealRequirement]})
			.then(function(mrcats){
				customer.findAll({
					where:{
						id:customerID
					},
					include:[mealRequirement]
				}).then(function(customers){
					res.render('main.ejs', {page:"addCustomer", mrcats:mrcats, customers:customers});
				});
			});
	});

	app.get('/mealOptions', function (req, res){
		console.log ('GET /mealOptions');
		mealRequirementCategory.findAll({include:[mealRequirement]})
		.then(function(mrcats){
			res.render('main.ejs', {page:"mealOptions", mrcats:mrcats});
		});
	});

	app.post('/addNewMRCategory', function (req, res){
		console.log ('POST /addNewMRCategory');
		mealRequirementCategory.create(
			{
				category:req.body.newMRCat
			}
		).then(function(mrcat){
			res.send(JSON.stringify({ mrcat: mrcat }));
		});
	});

	app.post('/addNewMR', function (req, res){
		console.log ('POST /addNewMR');

		mealRequirementCategory.findAll({
			where:{
				id:req.body.categoryID
			}
		}).then(function(mrcat){
			mealRequirement.create(
				{
					requirement:req.body.newMR,
					mealRequirementCategoryId:req.body.categoryID
				}
			).then(function(mr){
				res.send(JSON.stringify({ mr: mr }));
			});
		});
	});

	//API url for mobile app
	app.get("/getAddresses", function(req,res){
		//need to add check that this is being accessed by app only
		//also need to filter this list to provide only the customers for today, + eventually for a particular driver
		customer.findAll()
		.then(function(customers){
			res.send(JSON.stringify({ customers:customers }));
		});
	});
}

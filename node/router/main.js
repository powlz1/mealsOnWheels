/*var orm 	   =  	require('../orm.js');
var Sequelize  =    require('sequelize');
var customer = Sequelize.define('customer',orm.Customer);*/

var db = require('../db.js');
var customer = db.customer;
var mealRequirementCategory = db.mealRequirementCategory;
var mealRequirement = db.mealRequirement;
var customerDay = db.customerDay;
var driver = db.driver;
var user = db.user;

//utility day array
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


module.exports = function(app, socket)
{

	app.get(['/', '/index'], function (req, res) {
		console.log ('GET /index');

		var today = days[new Date().getDay()];

		customerDay.findAll({
			where: {
				day:today
			},
			attributes: ['key',[db.sequelize.fn('COUNT', db.sequelize.col('key')), 'count']],
			group: ["key"]
		}).then(function(customerDays) {
			console.log(customerDays);
			
			customerDay.findAll({
				attributes: ['key','day',[db.sequelize.fn('COUNT', db.sequelize.col('key')), 'count']],
				group: ["key", "day"]
			}).then(function(allCustomerDays){
				res.render('main.ejs', {page:"index", today:today, customerDays:customerDays,allCustomerDays:allCustomerDays});
			});
		});
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
		var c = req.body.customer;

		user.create(req.body.user)
			.then(function(user){
				c.userID=user.id;
				customer.create(c)
					.then(function(customer){
						mealRequirement.findAll({
							where:{
								id:req.body.mealRequirements
							}
						})
							.then(function(mealRequirement){
								customer.addMealRequirements(mealRequirements)
									.then(function(){
										var customerDays = [];
										var dayKeys = Object.keys(req.body.customerDay);


					dayKeys.forEach(function(day){
						var obj = req.body.customerDay[day];
						var mealKeys = Object.keys(obj);
						mealKeys.forEach(function(key){
							var c = {'day':day,'key':key,'customerId':customer.id};
							customerDays.push(c);
						});
					});
					customerDay.bulkCreate(customerDays).then(function(cDays){
						
						app.render('partials/customer.ejs', {customer:customer}, function(err, html) {
							//console.log(err)
						//	console.log(html)
						socket.emit('zak', html);
							});
									
						res.send(JSON.stringify({ customer: customer }));
					})
				});
			})
		});
	});
		

	app.get('/addCustomer', function (req, res){
		console.log ('GET /addCustomer');
		mealRequirementCategory.findAll({include:[mealRequirement]})
			.then(function(mrcats){
				res.render('main.ejs', {page:"addCustomer", mrcats:mrcats, customer:{}, user:{}});
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
					res.render('main.ejs', {page:"addCustomer", mrcats:mrcats, customer:customers[0]});
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
	
	app.get('/addDriver', function(req,res){
		console.log('GET /addDriver')
		res.render('main.ejs', {page:"addDriver", driver:{}});
	});
	
		app.get("/maps", function(req,res){
		customer.findAll()
		.then(function(customers){
			res.render('main.ejs', {page:"maps", customers:customers});
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
	
	app.get('/addDriver', function (req, res){
		console.log ('GET /addDriver');
		res.render('main.ejs', {page:"addDriver", driver:{}});
	});
	
	app.post('/addDriver', function (req, res){
		console.log(req.body);
		console.log ('POST /addDriver');
		var d = req.body.driver;
		
		user.create(
			req.body.user
		).then(function(user){
			d.userId = user.id;
			driver.create( 
				d
			).then(function(driver){
				res.send(JSON.stringify({ driver: driver }));
			});	
		});
	});
			
	app.get("/getDrivers", function(req,res){
		//need to add check that this is being accessed by app only
		//also need to filter this list to provide only the customers for today, + eventually for a particular driver
		driver.findAll()
		.then(function(drivers){
			res.send(JSON.stringify({ drivers:drivers }));
		});
	});
}

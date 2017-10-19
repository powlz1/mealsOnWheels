// routes/main.js

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
var customerDriver = db.customerDriver;

var ensureLogin = require('connect-ensure-login')
var passport = require('passport');

//utility day array
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// Counts how many individual keys there are
var countOfKeys = [db.sequelize.fn('COUNT', db.sequelize.col('key')), 'count'];

module.exports = function(app, socket)
{
	//////////////////////////////////////////////
	// Index page
	app.get(['/', '/index'], function (req, res) {
		// For debugging purposes
		console.log ('GET /index');

		// Gets the name of today's date and stores it
		var today = days[new Date().getDay()];

		

		// Sequelize statement to find all customer days
		customerDay.findAll({
			// Where clause
			where: {
				// Will find all customerdays for whichever day of the week today is
				day: today
			},

			// 
			attributes: ['key', countOfKeys],

			// Groups everything by the key
			group: ["key"]

		// Callback, passing in the results of the final all statement
		}).then(function(customerDays) {
			console.log(customerDays);			
			
			customerDay.findAll({
				attributes: ['key','day', countOfKeys],

				// Sort by key, then by day
				group: ["key", "day"]

			// Another callback passing in the results of the find all statement
			}).then(function(allCustomerDays){
				// Render the page and pass variables from today, the previous findall statement, and the one before
				
				res.render('main.ejs', 
				{page: "index", today: today, customerDays: customerDays, allCustomerDays: allCustomerDays, sunny: req.isAuthenticated()}
				);
			});
		});
	});
	
	app.get('/viewCustomers', /*ensureLogin.ensureLoggedIn(),*/ function (req, res){
		console.log ('GET /viewCustomers');		

		// Find all the customers, include the mealRequirement and user tables
		customer.findAll({include:[mealRequirement,user]})
			.then(function(customers) {

				// Render the viewCustomers page, passing through all the customers
				res.render('main.ejs', {page:"viewCustomers", customers:customers});
			});
	});
	
	app.post('/addCustomers', function (req, res){
		console.log(req.body);
		console.log ('POST /addCustomers');

		// customer variable from the post request
		var c = req.body.customer;

		// User ID variable
		var uID = user.id;

		// Create a new customer
		user.create(req.body.user).then(function(user){
			
			c.userId = user.id;
			customer.create(c).then(function(customer) {
				mealRequirement.findAll({
					where: {
						id: req.body.mealRequirements
					}
				}).then(function(mealRequirements){
					customer.addMealRequirements(mealRequirements).then(function(){
						var customerDays = [];
						var dayKeys = Object.keys(req.body.customerDay);

						dayKeys.forEach(function(day) {
							var obj = req.body.customerDay[day];
							var mealKeys = Object.keys(obj);

							// Iterate over the mealKeys
							mealKeys.forEach(function (key) {
								var c = {'day': day, 'key': key, 'customerId': customer.id};
								customerDays.push(c);
							});

							// Inserts multiple customerDays into the customerDay table
							customerDay.bulkCreate(customerDays).then(function (cDays) {
								//method to pass the new customer int othe view customer page so that it can be displayed within the table
								// Find all customers
								customerDay.findAll({
									attributes: ['key', 'day', countOfKeys],
									// Group by key and day
									group: ["key", "day"]
								}).then(function (allCustomerDays) { // Pass through all the found customerDays
									// Tells the socket.io to get the customer days again
									socket.emit('get_Customer_Days', allCustomerDays);
								});
								// Send a JSON response and stringify all the info
								res.send(JSON.stringify({customer: customer}));
							}); // end customerDay.bulkCreate.then
						});
					}); // End customer.addMealRequirements.then
				}); // end mealRequirement.findAll.then
			}); // end customer.create.then
		}); // end user.create.then
	});		// end app.get callback
		

	app.get('/addCustomer', /*ensureLogin.ensureLoggedIn(),*/ function (req, res){
		console.log ('GET /addCustomer');

		// Find all the meal requirement categories with the mealrequirement foreign key
		mealRequirementCategory.findAll({include:[mealRequirement]})
			.then(function(mrcats){ // short for meal requirement category
				// Render the addCustomer page, passing through all meal requirements, an empty customer object, and an empty user object
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
					include:[mealRequirement, user]
				}).then(function(customers){
					res.render('main.ejs', {page:"addCustomer", mrcats:mrcats, customer:customers[0], user:customers[0].user});
				});
			});
	});

	app.get('/mealOptions', /* ensureLogin.ensureLoggedIn(),*/ function (req, res){
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
	
	app.get('/addDriver',  ensureLogin.ensureLoggedIn(),  function(req,res){
		console.log('GET /addDriver')
		res.render('main.ejs', {page:"addDriver", driver:{}});
	});
	
	app.get("/maps", function(req,res){
	customer.findAll({include:[user]})
	.then(function(customers){
		res.render('main.ejs', {page:"maps", customers:customers});
		});
	});
	
	
//doesn't work
	app.get("/getAddresses/:driverId", function(req,res){
		var id = req.params.driverId;
		customerDriver.findAll({where:{driverId:driver.id}})
			.then(function(customerDriver){ customer.findAll({where:{id:customerDriver.id}})
	});});
	
	app.get('/addDriver', function (req, res){
		console.log ('GET /addDriver');
		res.render('main.ejs', {page:"addDriver", driver:{}});
	});
	
	app.post('/addDriver', function (req, res){
		console.log(req.body);
		console.log ('POST /addDriver');
		var d = req.body.driver;
		
		user.create(req.body.user).then(function(user){
			d.userId = user.id;
			driver.create(d).then(function(driver){
				res.send(JSON.stringify({ driver: driver }));
			});	
		});
	});
			
	app.get("/getDrivers", function(req,res){
		//need to add check that this is being accessed by app only
		//also need to filter this list to provide only the customers for today, + eventually for a particular driver
		driver.findAll({include:[user]})
		.then(function(drivers){
			res.send(JSON.stringify({ drivers:drivers }));
		});
	});
	
	app.get("/customerDriver", ensureLogin.ensureLoggedIn(),  function(req,res){
		console.log ('GET /customerDriver');
		customer.findAll({include:[user]})
		.then(function(customers){
			driver.findAll({include:[user]})
				.then(function(drivers){
					res.render('main.ejs', {page:"dropdownList",customers:customers,drivers:drivers });
				})
		})
	 });
	 
	 app.post('/customerDriver', function (req, res){
		console.log(req.body);
		console.log ('POST /customerDriver');
		var d = req.body.driver;
		var c = req.body.customer;
		
		driver.findAll({
			where:{
				id:d
			}
		})
		.then(function(drive){
			customer.findAll({
				where:{
					id:c
				}
			})
			.then(function(cust){
				drive[0].addCustomers(cust)
				.then(function(driver){
					res.send(JSON.stringify({ driver: driver }));
				});
			})
		})
	 });

	/*app.get("/getAddresses", function(req,res){
		
		
		
		
		
		
		
		customerDriver.findAll({include:[customer,driver]})
		.then(function(customerDriver){
			res.send(JSON.stringify({customerDriver:customerDriver}));
		});
		
	});*/
		
	//Passport routes=================================================================
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/home', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	//=====================================
	//LOGIN ===============================
	//=====================================
	//show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// // process the login form
 //    app.post('/login',
	// passport.authenticate('local-signup', { successReturnToOrRedirect: '/home', failureRedirect: '/login' }),
	// function(req, res) {
	//     console.log ('redirect to login');
	//     res.render('main.ejs', {page:"index.ejs"});
	//   });
    // process the login form
	app.post('/login', passport.authenticate('local-login', {
           // successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify
	app.get('/profile', ensureLogin.ensureLoggedIn(), function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
		}//closes route function

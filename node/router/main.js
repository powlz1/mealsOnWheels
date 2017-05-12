/*var orm 	   =  	require('../orm.js');
var Sequelize  =    require('sequelize');
var customer = Sequelize.define('customer',orm.Customer);*/

var server = require('../server.js');
var customer = server.customer;
var mrCategory = server.mrCategory;
var mealR = server.mealR;
var passport = require('passport');
var Strategy = require('passport-local').Strategy;



module.exports = function(app)
{
	
//** ROUTES **
//
// Authenticated specifies if route needs authentication to access
	
	//Working - Authenticated
	app.get('/', require('connect-ensure-login').ensureLoggedIn(), function (req, res){
		console.log ('GET /');
		res.render('main.ejs', {page:"index"});
	});	

	//Working - Authenticated
	app.get('/index', require('connect-ensure-login').ensureLoggedIn(), function (req, res){
		console.log ('GET /index');
		res.render('main.ejs', {page:"index"});
	});
	
	//Working - Authenticated
	app.get('/viewCustomers', require('connect-ensure-login').ensureLoggedIn(), function (req, res){
		console.log ('GET /viewCustomers');
		customer.findAll()
		.then(function(customers){
				res.render('main.ejs', {page:"viewCustomers", customers:customers});
 		});
	});
	
	//NA
	app.post('/addCustomers', function (req, res){
		console.log(req.body);
		console.log ('POST /addCustomers');

		customer.create( //customer.create({}); for one row at a time, customer.bulkCreate([{},{}]) for multiple rows
			req.body
		).then(function(customer){
			res.send(JSON.stringify({ customer: customer }));
		});
	});

	//Working - Authenticated
	app.get('/addCustomer', require('connect-ensure-login').ensureLoggedIn(), function (req, res){
		console.log ('GET /addCustomer');
		mrCategory.findAll({include:[mealR]})
			.then(function(mrcats){
				res.render('main.ejs', {page:"addCustomer", mrcats:mrcats});
			});
	});

	//********* view users ***********
	app.get('/viewUsers', require('connect-ensure-login').ensureLoggedIn(), function (req, res){
		console.log ('GET /viewUsers');
		customer.findAll()
		.then(function(users){
				res.render('main.ejs', {page:"viewUsers", users:users});
 		});
	});

	//********* Creating users sending json ***********
	app.post('/addUsers', function (req, res){
		console.log(req.body);
		console.log ('POST /addUsers');

		user.create( //user.create({}); for one row at a time, user.bulkCreate([{},{}]) for multiple rows
			req.body
		).then(function(user){
			res.send(JSON.stringify({ user: user }));
		});
	});

	//********* Create Users ***********
	app.get('/addUser', function (req, res){
		console.log ('GET /addUser');
		mrCategory.findAll({include:[mealR]})
			.then(function(mrcats){
				res.render('main.ejs', {page:"addUser", mrcats:mrcats});
			});
	});

	//Working - SORTOF - Authenticated
	app.get('/editCustomer/:customerID', require('connect-ensure-login').ensureLoggedIn(), function (req, res){
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

	//Working - Authenticated
	app.get('/mealOptions', require('connect-ensure-login').ensureLoggedIn(), function (req, res){
		console.log ('GET /mealOptions');
		mrCategory.findAll({include:[mealR]})
		.then(function(mrcats){
			res.render('main.ejs', {page:"mealOptions", mrcats:mrcats});
		});
	});

	//NA
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

	//NA
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

	//Working
	app.get('/login',
	  function(req, res){
	    console.log ('login');
	    res.render('login');
	  });
	
	//Working - Redirect	  
	app.post('/login', 
	  passport.authenticate('local', { failureRedirect: '/login' }),
	  function(req, res) {
	    console.log ('redirect to login');
	    res.render('main.ejs', {page:"index.ejs"});
	  });

	//Working	  
	app.get('/logout',
	  function(req, res){
	    console.log ('logging out');
	    req.logout();
	    res.redirect('/');
	  });

	//Working
	app.get('/profile',
	  require('connect-ensure-login').ensureLoggedIn(), function(req, res){
	    console.log ('profile route');
	    res.render('profile', { user: req.user });
	  });

}

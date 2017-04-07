var express    =    require('express');
var fs = require ('fs');
var app        =    express();

var server = require('http').createServer (app);

var exports = module.exports = {};
var Sequelize  =    require('sequelize');
var mysql 	   = 	require('mysql');
var orm 	   =  	require('./orm.js');
var bodyParser = 	require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	extended: true
	}));




//initialising javascript - http://docs.sequelizejs.com/en/v3/docs/getting-started/
var sequelize = new Sequelize('mow', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var customer = sequelize.define('customer',orm.Customer);
var customerDay = sequelize.define('customerDay',orm.CustomerDay);
var mrCategory = sequelize.define('MRcategory',orm.MealRequirementCategory);
var mealR = sequelize.define('mealR',orm.MealRequirement);
var customerMR =  sequelize.define('customerMR',orm.CustomerMealRequirement);
var driver = sequelize.define('driver',orm.Driver);
var staff = sequelize.define('staff',orm.Staff);

var tableCreate=true;

customer.sync();
customerDay.sync();
mrCategory.sync(); 
mealR.sync();
customerMR.sync(); 
driver.sync();
staff.sync();

exports.customer = customer;

 //customer.create({}); for one row at a time, customer.bulkCreate([{},{}]) for multiple rows



require('./router/main')(app);

app.use(express.static(__dirname + '/public')); 
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

<<<<<<< HEAD
var port = 3000;

var server     =    app.listen(port,function() {
    console.log("Express is running on port 3000");
});

var exports = module.exports = {};
var Sequelize  =    require('sequelize');
var mysql 	   = 	require('mysql');
var orm 	   =  	require('./orm.js');
/*var bodyParser = 	require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
	extended: true
	}));*/




//initialising javascript - http://docs.sequelizejs.com/en/v3/docs/getting-started/
var sequelize = new Sequelize('mow', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var customer = sequelize.define('customer',orm.Customer);
var customerDay = sequelize.define('customerDay',orm.CustomerDay);
var mrCategory = sequelize.define('MRcategory',orm.MealRequirementCategory);
var mealR = sequelize.define('mealR',orm.MealRequirement);
var customerMR =  sequelize.define('customerMR',orm.CustomerMealRequirement);
var driver = sequelize.define('driver',orm.Driver);
var staff = sequelize.define('staff',orm.Staff);

var tableCreate=true;

customer.sync();
customerDay.sync();
mrCategory.sync(); 
mealR.sync();
customerMR.sync(); 
driver.sync();
staff.sync();

exports.customer = customer;

 //customer.create({}); for one row at a time, customer.bulkCreate([{},{}]) for multiple rows



=======
	
app.use(express.static(__dirname + '/public'));

var server     =    app.listen(3000,function(){
console.log("Express is running on port 3000");
});
>>>>>>> a7c3d10f911c4d9db71c2a3c5b34c480919b989d

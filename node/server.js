var express    =    require('express');
var app        =    express();
var Sequelize  =    require('sequelize');
var mysql 	   = 	require('mysql');
var orm 	   =  	require('./orm.js');

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server     =    app.listen(3000,function(){
console.log("Express is running on port 3000");
});


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

//adds data one row at a time, every time it runs
var person = customer.bulkCreate([ //customer.create({}); for one row at a time, customer.bulkCreate([{},{}]) for multiple rows
{customerNumber:"0001",firstName:"adon",lastName:"moskal",address:"sdfgdfdfkdfdf",email:"watsiodnf@sfgk.com",phoneNumber:"858839",customerStatus:"active",bio:"dfhdfghdfdhasfhdgh",photo:"img.jpg",adminNotes:"sdfghjkgfjkdfhjkdf"},
{customerNumber:"0002",firstName:"sam",lastName:"watson",address:"sdfgdfdfkdfdf",email:"watsiodnf@sfgk.com",phoneNumber:"858839",customerStatus:"dead",bio:"dfhdfghdfdhasfhdgh",photo:"img.jpg",adminNotes:"sdfghjkgfjkdfhjkdf"}
]);

var addDay = customerDay.create({
	day:"Monday",
	customerID:"1"
});

var mealReq=mrCategory.create({
	category:"No tomatoes"
});


	
//


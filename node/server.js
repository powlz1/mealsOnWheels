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
var mrCategory = sequelize.define('MRcategory',orm.MRcategory);
var mealR = sequelize.define('mealR',orm.mealR);
var customerMR =  sequelize.define('customerMR',orm.customerMR);
var driver = sequelize.define('driver',orm.driver);

//console.log(customer);

//console.log("end");

sequelize.sync();
var person = customer.build({
	firstName:"adon",
	lastName:"moskal",
	address:"sdfgdfdfkdfdf",
	email:"watsiodnf@sfgk.com",
	phoneNumber:"858839"
});

//console.log(person);

//17 mar get select working properly - find out how to do foreign keys
person.save().then(function() 
			{
				customer.findAll()
					.then(function(customers){
					for (var i;i<customers.length;i++){
						console.log(customers[i].dataValues);
					}
				})
			});
 
 //select statement




var express    =    require('express');
var app        =    express();
var Sequelize  =    require('sequelize');

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
  },
});


var Customer = sequelize.define('customer',{
	customerID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true
	},
	firstName:{
		type:Sequelize.STRING,
		field: 'first_name' //creates table attribute
	},
	lastName:{
		type:Sequelize.STRING,
		field: 'last_name' //creates table attributes
	},
	address:{
		type:Sequelize.STRING,
		field: 'address'
	},
	email:{
		type:Sequelize.STRING,
		field:'email'
	},
	phoneNumber:{
		type:Sequelize.STRING,
		field:'phoneNumber'
	}
});

var person = Customer.build({
	firstName:"Thomas",
	lastName:"Watson",
	address:"sdfgdfdfkdfdf",
	email:"watsiodnf@sfgk.com",
	phoneNumber:"858839"
});

//console.log(person.firstName);

sequelize.sync();
person.save().then(function() {console.log("person saved");});

Customer.findAll({where:{firstName:"Thomas"}})
		.then(function(customers){
				console.log(customers[0].dataValues);
		});





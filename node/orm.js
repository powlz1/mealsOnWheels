//rename to models.js
var Sequelize  =    require('sequelize');
module.exports.Customer = {  //module.exports so the server.js file can access
	customerID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true,
		field:'customer_id'
	},
	customerNumber:{
		type:Sequelize.INTEGER,
		field:'customerNumber'
	},
	firstName:{
		type:Sequelize.STRING,
		field: 'first_name' //the physical table atrribute
	},
	lastName:{
		type:Sequelize.STRING,
		field: 'last_name' 
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
		field:'phone'
	},
	customerStatus:{   //active, not active, dead
		type:Sequelize.STRING,
		field:'status'
	},
	bio:{
		type:Sequelize.STRING,
		field:'bio'
	},
	photo:{
		type:Sequelize.BLOB,
		field:'photo'
	},
	adminNotes:{
		type:Sequelize.STRING,
		field:'adminNotes'
	}
		
};
module.exports.CustomerDay = {
	customerDayID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true, 
		field:'customerDayid'
	},
	date:{
		type:Sequelize.DATE,
		field:'date'
	}
};
//Customer.belongsTo(CustomerDay); //foreign key declaration

module.exports.MRcategory = {
	MRcategoryID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true,
		field:'MRcategoryID'
	},
	category:{
		type:Sequelize.STRING,
		field: 'category'
	}
};
//mealR.belongsTo(MRcategory);

module.exports.mealR = {
	mealRid:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true,
		field:'mealRid'
	},
	requirement:{
		type:Sequelize.STRING,
		field: 'requirement'
	}
};

module.exports.customerMR ={
	customerMRid:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true,
		field:'customerMRid'
	}
};

/*Customer.belongsTo(customerMR);
mealR.belongsTo(customerMR);*/

module.exports.driver = {
	username:{
		type:Sequelize.STRING,
		field:'username'
	},
	password:{
		type:Sequelize.STRING,
		field: 'password'
	},
	email:{
		type:Sequelize.STRING,
		field:'email'
	},
	phone:{
		type:Sequelize.STRING,
		field:'phone'
	},
};
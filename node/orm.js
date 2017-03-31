//rename to models.js

var exports=module.exports={};

var Sequelize  =    require('sequelize');


exports.Customer = {  //module.exports so the server.js file can access
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

exports.CustomerDay = {
	customerDayID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true, 
		field:'customerDayid'
	},
	day:{
		type:Sequelize.STRING,
		field:'day'
	},
	customerID:{
		type:Sequelize.INTEGER
	}
};
//(module.exports.Customer).hasOne(module.exports.CustomerDay, {foreignKey:'customerID'}); //foreign key declaration
//exports.CustomerDay.hasOne(Customer, {foreignKeyConstraint:true});

exports.MealRequirementCategory = {
	mealRequirementCategoryID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true,
		field:'mealRequirementCategoryID'
	},
	category:{
		type:Sequelize.STRING,
		field: 'category'
	}
};
//mealR.belongsTo(MRcategory);

exports.MealRequirement = {
	mealRequirementID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true,
		field:'mealRequirementID'
	},
	requirement:{
		type:Sequelize.STRING,
		field: 'requirement'
	}
};

exports.CustomerMealRequirement ={
	customerMealRequirementID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true,
		field:'customerMealRequirementID'
	}
};

/*Customer.belongsTo(customerMR);
mealR.belongsTo(customerMR);*/


exports.Driver = {
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

exports.Staff = {
	staffID:{
		autoIncrement:true,
		type:Sequelize.INTEGER,
		primaryKey:true, 
		field:'staffID'
	},
	staffType:{
		type:Sequelize.STRING,
		field:'StaffType'
	},
	staffAvailability:{
		type:Sequelize.STRING,
		field:'StaffAvailability'
	},
};



module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('customer', {
        id:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            primaryKey:true,
            field:'id'
        },
        customerNumber:{
            type:DataTypes.INTEGER,
            field:'customerNumber'
        },
        address:{
            type:DataTypes.STRING,
            field: 'address'
        },
        customerStatus:{   //active, not active, dead
            type:DataTypes.STRING,
            field:'customerStatus'
        },
        bio:{
            type:DataTypes.STRING,
            field:'bio'
        },
        photo:{
            type:DataTypes.BLOB,
            field:'photo'
        },
        adminNotes:{
            type:DataTypes.STRING,
            field:'adminNotes'
        },
		lat:{
			type:DataTypes.INTEGER,
            field:'latitude'
		},
		lng:{
			type:DataTypes.INTEGER,
            field:'longitude'
		
		}
		
	
    });

    return Customer;
}

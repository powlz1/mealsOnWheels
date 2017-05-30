module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('driver', {
        id:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            primaryKey:true,
            field:'id'
        },
		driverStatus:{
			type:DataTypes.STRING,
            field:'driverStatus'
        },
		licenceNumber:{
			type:DataTypes.INTEGER,
			field:'licenceNumber'
		},
		licencePlate:{
			type:DataTypes.STRING,
			field:'licencePlate'
		}
    });

    return Driver;
}

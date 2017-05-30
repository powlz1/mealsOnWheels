module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            primaryKey:true,
            field:'id'
        },
        firstName:{
            type:DataTypes.STRING,
            field: 'firstName'
        },
        lastName:{
            type:DataTypes.STRING,
            field: 'lastName'
        },
        email:{
            type:DataTypes.STRING,
            field:'email'
        },
        phone:{
            type:DataTypes.STRING,
            field:'phone'
        }, 
		username:{
			type:DataTypes.STRING,
			field:'username'
		},
		password:{
			type:DataTypes.STRING,
			field:'password'
		}
	});
	return User;
}
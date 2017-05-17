module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('driver', {
        id:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            primaryKey:true,
            field:'id'
        },
        username:{
            type:DataTypes.STRING,
            field:'username'
        },
        password:{
            type:DataTypes.STRING,
            field: 'password'
        },
        email:{
            type:DataTypes.STRING,
            field:'email'
        },
        phone:{
            type:DataTypes.STRING,
            field:'phone'
        }
    });

    return Driver;
}

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
        firstName:{
            type:DataTypes.STRING,
            field: 'firstName' //the physical table atrribute
        },
        lastName:{
            type:DataTypes.STRING,
            field: 'lastName'
        },
        address:{
            type:DataTypes.STRING,
            field: 'address'
        },
        email:{
            type:DataTypes.STRING,
            field:'email'
        },
        phoneNumber:{
            type:DataTypes.STRING,
            field:'phoneNumber'
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
        }
    });

    return Customer;
}

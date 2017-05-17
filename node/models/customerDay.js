module.exports = (sequelize, DataTypes) => {
    const CustomerDay = sequelize.define('customerDay', {
        id:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            primaryKey:true,
            field:'id'
        },
        day: {
            type: DataTypes.STRING,
            field: 'day'
        }
    });

    return CustomerDay;
}
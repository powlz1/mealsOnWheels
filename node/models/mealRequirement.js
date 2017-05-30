module.exports = (sequelize, DataTypes) => {
    const MealRequirement = sequelize.define('mealRequirement', {
        id:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            primaryKey:true,
            field:'id'
        },
        requirement:{
            type:DataTypes.STRING,
            field: 'requirement'
        }
    });

    return MealRequirement;
}

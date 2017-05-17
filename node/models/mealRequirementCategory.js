module.exports = (sequelize, DataTypes) => {
    const MealRequirementCategory = sequelize.define('mealRequirementCategory', {
        id:{
            autoIncrement:true,
            type:DataTypes.INTEGER,
            primaryKey:true,
            field:'id'
        },
        category:{
            type:DataTypes.STRING,
            field: 'category'
        }
    });

    return MealRequirementCategory;
}

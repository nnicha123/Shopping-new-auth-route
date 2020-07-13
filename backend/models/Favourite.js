module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define("Favourite",{
        image:{
            type:DataTypes.STRING(255)
        },
        title:{
            type:DataTypes.STRING(255)
        }
    },{
        tableName:'favourites',
        timestamps:false
    })
    model.associate = models => {
        model.belongsTo(models.User,{foreignKey:'user_id'})
    }
    return model
}
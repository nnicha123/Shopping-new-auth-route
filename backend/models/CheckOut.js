module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define('CheckOut', {
        image:{
            type:DataTypes.STRING(255)
        },
        title:{
            type:DataTypes.STRING(255)
        },
        price:{
            type:DataTypes.FLOAT
        },
        quantity:{
            type:DataTypes.INTEGER
        }
    },{
        tableName:'checkouts',
        timestamps:false
    })
    model.associate = models => {
        model.belongsTo(models.User,{foreignKey:'user_id'})
    }
    return model
}
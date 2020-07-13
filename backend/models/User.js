module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define("User",{
        username:{
            type:DataTypes.STRING(255),
            unique:true
        },
        password:{
            type:DataTypes.STRING(255)
        },
        name:{
            type:DataTypes.STRING(255)
        }
    },{
        tableName:"users",
        timestamps:false
    })
    model.associate = models => {
        model.hasMany(models.CheckOut, {foreignKey:'user_id'})
        model.hasMany(models.Favourite,{foreignKey:'user_id'})
    }
    return model
}
const db = require('../models')

const getFavourite = async (req,res) => {
    const favItem = await db.Favourite.findOne({where:{user_id:req.user.id}})
    if(favItem) res.status(200).send(favItem)
    else res.status(400).send({message:'Cannot find items'})
}
const addFavourite = async(req,res) =>{
    const {title,image} = req.body
    const favItem = await db.Favourite.create({
        title:title,
        image:image,
        user_id:req.user.id
    })
    res.status(201).send(favItem)
}
const deleteFavourite = async(req,res) => {
    const deleteItem = Number(req.params.id)
    const findItem = await db.Favourite.findOne({where:{id:deleteItem,user_id:req.user.id}})
    if(findItem) await findItem.destroy()
    else res.status(400).send({message:"Unable to find Item"})
    res.status(204).send();
}

module.exports = {
    getFavourite,addFavourite,deleteFavourite
}
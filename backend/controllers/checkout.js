const db = require('../models')

const getCheckout = async (req,res) => {
    const items = await db.CheckOut.findAll({where:{user_id:req.user.id}})
    res.status(200).send(items)
}
const addCheckOuts = async(req,res) => {
    const {title,image,price,quantity} = req.body
    const newCheckout = await db.CheckOut.create({
        title:title,
        image:image,
        price:price,
        quantity:quantity,
        user_id:req.user.id
    })
    res.status(201).send(newCheckout)
}
const deleteCheckouts = async(req,res) => {
    const deleteItem = Number(req.params.id)
    const targetItem = await db.CheckOut.findOne({where:{id:deleteItem,user_id:req.user.id}})
    if(targetItem) {await targetItem.destroy()}
    else {res.status(400).send({message:"Item not found"})}
    res.status(400).send()
}
const updateCheckout = async(req,res) => {
    const targetId = Number(req.params.id)
    const {image,title,price,quantity} = req.body
    const item = await db.CheckOut.findOne({where:{id:targetId,user_id:req.user.id}})
    if(item) {
        item.update({
            image:image,
            title:title,
            price:price,
            quantity:quantity
        })
        res.status(200).send({message:'Successfully Updated!'})
    }else{
        res.status(400).send({message:'Unable to update'})
    }
}

module.exports = {
    getCheckout,addCheckOuts,deleteCheckouts,updateCheckout
}
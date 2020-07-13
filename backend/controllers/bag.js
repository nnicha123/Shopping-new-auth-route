const db = require('../models')

const getBag = async(req,res) => {
    const allBags = await db.Bag.findAll()
    res.status(200).send(allBags)
}

module.exports = {
    getBag
}
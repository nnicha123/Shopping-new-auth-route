const db = require('../models')

const getCakes = async(req,res) => {
    const allCakes = await db.Cake.findAll()
    res.status(200).send(allCakes)
}

module.exports = {
    getCakes
}
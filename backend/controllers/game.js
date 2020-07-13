const db = require('../models')

const getGame = async(req,res) => {
    const allGame = await db.Game.findAll()
    res.status(200).send(allGame)
}

module.exports = {
    getGame
}
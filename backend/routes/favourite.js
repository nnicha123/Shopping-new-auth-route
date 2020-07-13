const express = require('express')
const router = express.Router()
const passport = require('passport')
const favouriteControllers = require('../controllers/favourite')

const authentication = passport.authenticate("jwt",{session:false})

router.get('/',authentication,favouriteControllers.getFavourite)
router.post('/',authentication,favouriteControllers.addFavourite)
router.delete('/:id',authentication,favouriteControllers.deleteFavourite)

module.exports = router
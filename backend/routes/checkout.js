const express = require('express')
const router = express.Router()
const passport = require('passport')
const checkoutControllers = require('../controllers/checkout')

const authentication = passport.authenticate("jwt",{session:false})

router.get('/',authentication,checkoutControllers.getCheckout)
router.post('/',authentication,checkoutControllers.addCheckOuts)
router.delete('/:id',authentication,checkoutControllers.deleteCheckouts)
router.put('/:id',authentication,checkoutControllers.updateCheckout)

module.exports = router
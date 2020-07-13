const express = require('express')
const router = express.Router()
const cakeController = require('../controllers/cakes')

router.get('/',cakeController.getCakes)

module.exports = router
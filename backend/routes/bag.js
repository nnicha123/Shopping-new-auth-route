const express = require('express')
const router = express.Router()
const bagController = require('../controllers/bag')

router.get('/',bagController.getBag)

module.exports = router
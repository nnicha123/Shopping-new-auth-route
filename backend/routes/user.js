const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user')

router.post('/register',userControllers.registerUser)
router.post('/login',userControllers.loginUser)
router.get('/',userControllers.getUser)

module.exports = router
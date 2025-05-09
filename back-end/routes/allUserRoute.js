const express = require('express')

const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {allUsers,profile} = require('../controllers/userController')



router.get('/alluser',authMiddleware,allUsers)
router.get('/profile',authMiddleware,profile)

module.exports = router
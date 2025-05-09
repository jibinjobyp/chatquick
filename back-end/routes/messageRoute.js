const express = require('express')
// const sendMessage = require('../controllers/messageController')
// const  getMessageBetweenUsers  = require('../controllers/messageController')
const { sendMessage, getMessageBetweenUsers,markAsRead } = require('../controllers/messageController')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')



router.post('/sendmessage',sendMessage)
router.get('/getmessagebetweenusers/:senderId/:receiverId',getMessageBetweenUsers)
router.patch('/markasread/:messageId',markAsRead)

module.exports = router
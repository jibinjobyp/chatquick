const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const sendMessage = async (req, res) => {
  const { sender, receiver, content, replyTo } = req.body;
  try {
    if (!content || !sender || !receiver) {
      return res.status(400).json({ message: "fill required fields" });
    }

    // Check if the conversation exists
    const conversation = await Conversation.findOne({
      users: { $all: [sender, receiver] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        users: [sender, receiver],
      });
    }
    const conversationId = conversation._id; // Get the conversation ID
    // Create a new message

    const newMessage = new Message({
      sender,
      receiver,
      conversationId,
      content,
      replyTo: replyTo || null, // This will be null if not provided
      read: false,  // Initially, set to false because the message is unread
    });
    

    await newMessage.save();
    return res.status(201).json({
      message: "Message is created",
      newMessage,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error in send message controller" });
  }
};

const getMessageBetweenUsers = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try{
    if(!senderId || !receiverId) {
      return res.status(400).json({message:"fill required fields"});
    }
  const messages = await Message.find({
    $or: [
      { sender:senderId , receiver: receiverId },
      { sender: receiverId , receiver: senderId }
    ]
  })
  console.log(messages);
  return res.status(200).json(messages);

  }catch(error){
    return res.status(500).json({ message: "internal server error in get message between users" });
  }

}


const markAsRead = async (req,res) => {
  const {messageId} = req.params;
  try{
    const updatedMessage = await Message.findByIdAndUpdate(messageId, {read:true},{new:true});
    if(!updatedMessage) {
      return res.status(404).json({message:"message not found"});
    }
    return res.status(200).json({message:"message marked as read", updatedMessage});
  }catch(error) {
    return res.status(500).json({message:"internal server error in mark as read"});
  }
}

module.exports = {sendMessage , getMessageBetweenUsers, markAsRead};
// module.exports = { sendMessage, getMessageBetweenUsers };

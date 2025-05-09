const e = require("cors");
const { Server } = require("socket.io");

let io;
let userSocket = {};  // A mapping of userId to socketId for users

// Initialize socket.io with the server
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",  // Frontend URL
      methods: ["GET", "POST"],
      credentials: true,  // Allow cookies and credentials
    },
  });

  // Handle incoming socket connections
  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    // Event when user joins
    socket.on('join', (userId) => {
     console.log(userId)
      // console.log("User joined:", userId);
      userSocket[userId] = socket.id;  // Store userId and corresponding socketId
    });

    // Event to send a message to a specific receiver
    socket.on("send_message", (data) => {
      console.log("📩 Message received from", socket.id, ":", data);

      const receiverSocketId = userSocket[data.receiver];
      if (receiverSocketId) {
        // Send message to the specific receiver
        io.to(receiverSocketId).emit("receive_message", data);
        console.log("Message sent to receiver:", receiverSocketId);
      } else {
        console.log("Receiver not connected:", data.receiver);
      }
    });

    // Event for typing indicator
    socket.on('typing', ({ senderId, receiverId }) => {
      console.log("Typing event received:", { senderId, receiverId });
      console.log('user socket',userSocket)
      const receiverSocketId = userSocket[receiverId]; 
      console.log('reciver hjhjh id',receiverSocketId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing', {senderId,receiverId});  // Notify receiver that the sender is typing
      }
    });

    // Event for stop typing indicator
    socket.on('stopTyping', ({ senderId, receiverId }) => {
      console.log("Stop typing event received:", { senderId, receiverId });
      const receiverSocketId = userSocket[receiverId];
      console.log('reciver id',receiverSocketId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('stopTyping', {senderId,receiverId});  // Notify receiver that the sender stopped typing
      }
    });

    // Disconnect event: Clean up userSocket map on disconnect
    socket.on("disconnect", () => {
      // Find the userId corresponding to the socketId
      for (let userId in userSocket) {
        if (userSocket[userId] === socket.id) {
          console.log("❌ User disconnected:", userId);
          delete userSocket[userId];  // Remove userId from the mapping
          break;
        }
      }
    });
  });
};

module.exports = initSocket;

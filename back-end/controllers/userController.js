const Message = require("../models/Message");
const User = require("../models/User");

const allUsers = async (req, res) => {  // 🔁 Fixed 'red' to 'res'
  try {
    const allUser = await User.find({}, "name profilePicture"); // fetch only 'name'
    console.log(allUser);
    return res.status(200).json(allUser);  // ✅ Send response
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server Error" });  // ✅ Handle errors properly
  }
};

const profile = async (req,res) => {
  try {
    
    const user = await User.findById(req.user._id).select('name email profilePicture');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  }catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { allUsers, profile };

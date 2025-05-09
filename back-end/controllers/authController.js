const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model\
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  console.log(req.file) // Log the request body and file for debugging
  const profilePicture = req.file ? req.file.path : null; // Get the profile picture path from the request

  // Validation: Ensure all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    // Check if user already exists
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture, // Save the profile picture path to the database
    });

    // Save the new user to the database
    await newUser.save();

    // Send success response
    return res.status(200).json({
      message: "User logged in successfully",
      
      user: {
        name: existUser.name,
        email: existUser.email,
        profilePicture: existUser.profilePicture, // Include profile picture if available
      },
    });
  } catch (error) {
    console.error(error);
    // Send error response
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    console.log(req)
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Check if user exists
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if password is correct
    const isPasswordTrue = await bcrypt.compare(password, existUser.password);
    if (!isPasswordTrue) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: existUser._id, email: existUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    return res.status(200).json({
      message: "User logged in successfully",
      token: token
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports= {signup,login}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming you have a User model\
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const profilePicture = req.file ? path.join(uploadDir, req.file.filename) : null;

    // Validation
    if (!name || !email || !password) {
      // Clean up uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Clean up uploaded file if user exists
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response without password
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.profilePicture
    };

    return res.status(201).json({
      message: "User created successfully",
      user: userResponse
    });
  } catch (error) {
    console.error("Signup error:", error);
    // Clean up uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
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
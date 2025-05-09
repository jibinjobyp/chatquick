const express = require("express");
const http = require("http");
const initSocket = require("./socket/index"); // Import the socket initialization function
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import the database connection function
dotenv.config(); // Load environment variables from .env file
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const allUserRoute = require('./routes/allUserRoute')

const app = express();

app.use(express.json()); // To parse JSON request bodies

app.use(morgan("dev")); // To log requests
app.use(helmet()); // To secure HTTP headers
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000", // Allow your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

app.use("/api/auth", userRoute);
app.use("/api/message", messageRoute);

app.use('/api/user',allUserRoute)


connectDB().then(() => {
  const server = http.createServer(app); // Create an HTTP server using Express app
  initSocket(server); // Initialize socket.io with the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

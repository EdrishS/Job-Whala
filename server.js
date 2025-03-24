// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const { setupSockets } = require("./sockets/socket");
const { authenticateJWT } = require("./middlewares/authMiddleware");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", authenticateJWT, jobRoutes);

// Setup WebSockets
setupSockets(io);

const PORT = process.env.PORT || 5433;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

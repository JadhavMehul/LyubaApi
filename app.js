const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { initSocket } = require("./socket/socket");


const app = express();
dotenv.config();

const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/location")
const userRoutes = require("./routes/userDetails")
const messageRoutes = require("./routes/message")

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/userDetails", userRoutes)
app.use("/api/message", messageRoutes)



// 🔹 Create HTTP server from express
const server = http.createServer(app);

// 🔹 Initialize Socket.io
initSocket(server);



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

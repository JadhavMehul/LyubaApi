const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/location")

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/location", locationRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

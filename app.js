const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const authRoutes = require("./routes/auth");

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get('/test', (req, res) => {
    console.log("HI");
    
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

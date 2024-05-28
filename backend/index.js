const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/User.js");

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://Blog:BjxVSRdwiss1H8go@cluster0.ngrcd0h.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const user = new UserModel({ username, email, password });
    await user.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

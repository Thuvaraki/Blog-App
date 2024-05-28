const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User.js");
const jwt = require("jsonwebtoken");

const PORT = 4000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

const saltRounds = 10;
const SECRET = "ABCD1234EFGH5678";

mongoose.connect(
  "mongodb+srv://Blog:BjxVSRdwiss1H8go@cluster0.ngrcd0h.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    jwt.sign(
      { username: user.username, id: user._id },
      SECRET,
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

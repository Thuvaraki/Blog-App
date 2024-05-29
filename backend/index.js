const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const PostModel = require("./models/Post.js");

const PORT = 4000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

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
        res.cookie("token", token).json({
          id: user._id,
          username: user.username,
        });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookies("token", "").json("ok");
});

app.post("/newPost", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, info) => {
    if (err) throw err;

    const { title, summary, content } = req.body;
    const post = await PostModel.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });

    res.json(post);
  });
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(20); // Limit the results to the 20 most recent posts
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id).populate("author", ["username"]);
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

app.put("/updatePost", uploadMiddleware.single("file"), async (req, res) => {
  let newPath;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, info) => {
    if (err) throw err;

    const { id, title, summary, content } = req.body;

    try {
      const existingPost = await PostModel.findById(id);

      if (!existingPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      const updatedData = {
        title,
        summary,
        content,
        cover: newPath ? newPath : existingPost.cover,
      };

      const updatedPost = await PostModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

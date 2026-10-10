const express = require("express");
const multer = require("multer");
require("dotenv").config();
const fs = require("fs");
const imagekit = require("./services/storage.service");
const postModel = require("./models/post.model");
const app = express();

app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/create-post", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const caption = req.body.caption;
  if (!caption || !caption.trim()) {
    return res.status(400).json({ message: "Caption is required" });
  }
  try {
    const response = await imagekit.files.upload({
      file: fs.createReadStream(req.file.path),
      fileName: req.file.originalname,
      folder: "/instagram-posts",
    });

    fs.unlink(req.file.path, () => {});

    const post = await postModel.create({
      image: response.url,
      caption: caption,
    });
    res.status(201).json({
      message: "Post created successfully in ImageKit and MongoDB",
      post: {
        id: post._id,
        imageUrl: post.image,
        caption: post.caption,
        fileId: response.fileId,
      },
    });
  } catch (error) {
    fs.unlink(req.file.path, () => {});
    console.error(error);

    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = app;

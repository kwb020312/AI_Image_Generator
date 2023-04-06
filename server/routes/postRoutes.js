import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import pngToJpeg from "png-to-jpeg";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

// CREATE A POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const buffer = new Buffer(photo.split(",")[1], "base64");

    pngToJpeg({ quality: 90 })(buffer).then(async (result) => {
      const bufferToJPEG = Buffer.from(result, "binary").toString("base64");
      const Base64JPEG = `data:image/jpeg;base64,${bufferToJPEG}`;

      const photoUrl = await cloudinary.uploader.upload(Base64JPEG, {
        timeout: 1000000,
      });
      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      });
      res.status(201).json({ success: true, data: newPost });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

export default router;

import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("DALL-E 요청을 받았습니다!");
});

export default router;

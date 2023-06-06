import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

var openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("DALL-E 요청을 받았습니다!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // xxxFormData 로 변환
    const xxxFormData = new URLSearchParams();
    xxxFormData.append("source", "ko");
    xxxFormData.append("target", "en");
    xxxFormData.append("text", prompt);

    // Papago 번역
    const translatePrompt = await axios({
      method: "POST",
      url: "https://openapi.naver.com/v1/papago/n2mt",
      data: xxxFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
      },
    });
    const { translatedText } = translatePrompt.data.message.result;

    // AI 이미지 생성
    const aiResponse = await openai.createImage({
      prompt: translatedText,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message);
  }
});

router.route("/papago").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // xxxFormData 로 변환
    const xxxFormData = new URLSearchParams();
    xxxFormData.append("source", "en");
    xxxFormData.append("target", "ko");
    xxxFormData.append("text", prompt);

    // Papago 번역
    const translatePrompt = await axios({
      method: "POST",
      url: "https://openapi.naver.com/v1/papago/n2mt",
      data: xxxFormData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
      },
    });
    const { translatedText } = translatePrompt.data.message.result;

    res.status(200).json({ result: translatedText });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message);
  }
});

export default router;

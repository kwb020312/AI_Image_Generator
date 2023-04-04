import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("DALL-E에 오신것을 환영합니다~!");
});

const startServer = async () => {
  const port = 8080;

  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () =>
      console.log(`서버가 ${port}포트에서 시작되었습니다.`)
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();

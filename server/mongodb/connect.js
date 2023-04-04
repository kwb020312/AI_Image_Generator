import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("mongoDB가 연결되었습니다."))
    .catch((err) => console.log(err));
};

export default connectDB;

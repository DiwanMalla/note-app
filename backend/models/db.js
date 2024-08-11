import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongo_url = process.env.MONGO_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log(`MONGO DB connected succesfully`);
  })
  .catch((err) => {
    console.log(`MongoDB Connection Error: ${err}`);
  });

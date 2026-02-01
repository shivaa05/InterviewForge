import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
async function connectDb() {
  try {
    const uri = process.env.MONGO_DB_URI;
    await mongoose.connect(uri);
    console.log("Data base connected successfully");
  } catch (error) {
    console.log("Error in connecting db", error);
    exit(1);
  }
}

export default connectDb
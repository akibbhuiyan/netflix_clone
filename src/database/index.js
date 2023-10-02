import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
    console.log("MongoDb connected");
  } catch (error) {
    console.log(error);
    throw new Error("Database connection failed");
  }
};

export default connectToDB;

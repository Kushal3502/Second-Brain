import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/secondbrain`
    );

    console.log(
      "MongoDB connected :: DB host :: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MongoDB connection error :: ", error);
    process.exit(1);
  }
};

export default connectDB;

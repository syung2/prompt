import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongodb is alreay connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.log("MONGODDB URL EMPTY");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log("mogodb connected");
  } catch (error) {
    console.log(error);
  }
};

import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {});
    connection.on("error", (err) => {
      console.log(err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;

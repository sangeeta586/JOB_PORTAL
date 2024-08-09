import mongoose from "mongoose"; // Use import instead of require

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      "Hi, job portal! You connected with database:",
      connect.connection.host,
      connect.connection.name,
      "😊😊😊😊😊😊"
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDb;

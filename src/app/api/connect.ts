import mongoose, { connect } from "mongoose";

const globalAsMongoose = global as unknown as {
  mongooseInstance: typeof mongoose | undefined;
  promise: Promise<typeof mongoose> | undefined;
};

async function connectDB() {
  // if (mongoose.connection && mongoose.connection.readyState === 0) {
  if (!globalAsMongoose.promise) {
    try {
      console.log("Connecting to MongoDB...");
      const client = connect(process.env.MONGO_URI as string);
      globalAsMongoose.promise = client;
      globalAsMongoose.mongooseInstance = await client;
      console.log(
        `MongoDB connected: ${globalAsMongoose.mongooseInstance.connection.host}`
      );
      return globalAsMongoose.mongooseInstance;
    } catch (error: any) {
      throw Error(error);
    }
  }
  return globalAsMongoose.mongooseInstance;
}

export default connectDB;

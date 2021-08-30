import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log(`Mongo DB connect: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Server error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;

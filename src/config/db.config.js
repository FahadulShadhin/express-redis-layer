import mongoose from 'mongoose';
import { MONGODB_URI, DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );
    console.log(`[mongodb] connected!`.magenta);
  } catch (error) {
    console.log('[mongodb] connection error:\n'.red, error);
    process.exit(1);
  }
};

export default connectDB;

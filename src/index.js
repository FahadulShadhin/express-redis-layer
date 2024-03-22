import dotenv from 'dotenv';
import { connectDB, initializeRedisClient } from './config/index.js';
import { app } from './app.js';
import { PORT } from './constants.js';

dotenv.config({
  path: './.env',
});

connectDB()
  .then(async () => {
    app.on('error', (error) => {
      console.log('ERROR:', error);
      throw error;
    });

    await initializeRedisClient();

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error!', error);
  });

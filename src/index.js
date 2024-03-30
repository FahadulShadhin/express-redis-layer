import dotenv from 'dotenv';
import { app } from './app.js';
import { PORT } from './constants.js';
import connectDB from './config/db.config.js';
import { initializeRedisClient } from './config/redis.config.js';
import colors from 'colors';

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
      console.log(`[server] running at port: ${PORT}`.cyan);
    });
  })
  .catch((error) => {
    console.log('[mongodb] connection error!'.red, error);
  });

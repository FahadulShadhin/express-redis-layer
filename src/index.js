import dotenv from 'dotenv';
import { connectDB } from './config/index.js';
import { app } from './app.js';
import { PORT } from './constants.js';

dotenv.config({
  path: './.env',
});

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log('ERROR:', error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error!', error);
  });

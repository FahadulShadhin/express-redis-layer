import { createClient } from 'redis';
import { REDIS_URI } from '../constants.js';

let redisClient = undefined;

const initializeRedisClient = async () => {
  const redisURL = REDIS_URI;
  if (redisURL) {
    redisClient = createClient({ url: redisURL }).on('error', (error) => {
      console.log('Failed to create the redis client:', error);
    });
  }

  try {
    await redisClient.connect();
    console.log('Redis connected!');
  } catch (error) {
    console.log('Redis connection failed:', error);
  }
};

export default initializeRedisClient;

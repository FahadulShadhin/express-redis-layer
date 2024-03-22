import { createClient } from 'redis';

let redisClient = undefined;

const initializeRedisClient = async () => {
  const redisURL = process.env.REDIS_URI;
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

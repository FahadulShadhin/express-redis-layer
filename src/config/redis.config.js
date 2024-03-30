import { createClient } from 'redis';
import hash from 'object-hash';
import { REDIS_URI } from '../constants.js';

let redisClient = undefined;

const initializeRedisClient = async () => {
  redisClient = createClient({ url: REDIS_URI }).on('error', (error) => {
    console.log('[redis] failed to create the redis client\n'.red, error);
  });

  try {
    await redisClient.connect();
    console.log('[redis] connected!'.yellow);
  } catch (error) {
    console.log('[redis] connection failed\n'.red, error);
  }
};

const requestToKey = (req) => {
  const reqDataToHash = {
    query: req.query,
    body: req.body,
  };

  return `${req.path}@${hash.sha1(reqDataToHash)}`;
};

const isRedisWorking = () => !!redisClient?.isOpen;

const writeData = async (key, data, options) => {
  if (isRedisWorking()) {
    try {
      await redisClient.set(key, data, options);
    } catch (error) {
      console.error(`[redis] failed to cache data for key=${key}\n`.red, error);
    }
  }
};

const readData = async (key) => {
  let cachedData = undefined;

  if (isRedisWorking()) {
    cachedData = await redisClient.get(key);

    if (cachedData) return cachedData;
  }
};

export {
  initializeRedisClient,
  isRedisWorking,
  requestToKey,
  writeData,
  readData,
};

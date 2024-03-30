import {
  isRedisWorking,
  requestToKey,
  writeData,
  readData,
} from '../config/redis.config.js';

export default function redisClientMiddleware(
  options = {
    EX: 21600, // 6hrs
  }
) {
  return async (req, res, next) => {
    if (isRedisWorking()) {
      const key = requestToKey(req);

      // if there is any cached data, read it and return
      const cachedData = await readData(key);
      if (cachedData) {
        console.log(`[redis] cached data found for key=${key}`.yellow);
        try {
          return res.json(JSON.parse(cachedData));
        } catch (error) {
          return res.send(cachedData);
        }
      } else {
        // else cache new data
        const oldSend = res.send;
        res.send = (data) => {
          res.send = oldSend;

          if (res.statusCode.toString().startsWith('2')) {
            console.log(`[redis] caching data for key=${key}`.yellow);
            writeData(key, data, options).then();
          }

          return res.send(data);
        };
        next();
      }
    } else {
      next();
    }
  };
}

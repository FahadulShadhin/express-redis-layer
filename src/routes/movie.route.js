import { Router } from 'express';
import { getMovies } from '../controllers/movie.controller.js';
import redisCliendMiddleware from '../middlewares/redis.middleware.js';

const router = Router();

router.route('/getMovies').get(
  redisCliendMiddleware({
    options: {
      EX: 432000, // 12hrs
      NX: false, // write data enen if key already exists
    },
  }),
  getMovies
);

export default router;

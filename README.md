# express-redis-layer

A middleware to easily add redis caching to express routes

## Usage

- Start redis server

```bash
$ sudo service redis-server start
```

- Start express server

```bash
$ yarn dev
```

![server running](/public/Screenshot%202024-03-30%20213805.png)

- Add the middleware to route:

```javascript
import { Router } from 'express';
import { getMovies } from '../controllers/movie.controller.js';
import redisClientMiddleware from '../middlewares/redis.middleware.js';

const router = Router();

router.route('/getMovies').get(
  redisClientMiddleware({
    options: {
      EX: 432000,
      NX: false,
    },
  }),
  getMovies
);

export default router;
```

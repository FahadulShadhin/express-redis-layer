import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { CORS_ORIGIN, LIMIT } from './constants.js';

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: LIMIT,
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: LIMIT,
  })
);
app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello world' });
});

export { app };

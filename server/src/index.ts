import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import router from './router';
import cookieParser from 'cookie-parser';

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use(router);

app.listen(SERVER_PORT, () => {
  console.log(`🚀 Server running at ${SERVER_PORT}`);
});

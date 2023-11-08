import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use(router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

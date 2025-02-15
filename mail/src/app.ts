import express from 'express';
import { mailRouter } from './routes/email.route';

const app = express();

app.use(express.json());

app.use('/email', mailRouter);

export default app;

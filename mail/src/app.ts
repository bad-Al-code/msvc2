import express from 'express';
import { mailRouter } from './routes/email.route';
import { unsubscribeRouter } from './routes/unsubscribe.route';

const app = express();

app.use(express.json());

app.use('/email', mailRouter);
app.use('/email', unsubscribeRouter);

export default app;

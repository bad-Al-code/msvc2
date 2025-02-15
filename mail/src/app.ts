import express from 'express';
import { mailRouter } from './routes/email.route';
import { unsubscribeRouter } from './routes/unsubscribe.route';
import { resubscribeRouter } from './routes/resubscribe.route';

const app = express();

app.use(express.json());

app.use('/email', mailRouter);
app.use('/email', unsubscribeRouter);
app.use('/email', resubscribeRouter);

export default app;

import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUser } from '@badalcodeorg/common';

import { errorHandler, NotFoundError } from '@badalcodeorg/common';
import { createTickerRouter } from './routes/new.route';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    }),
);

app.use(currentUser);
app.use(createTickerRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

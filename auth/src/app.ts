import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/currentUser.route';
import { siginRouter } from './routes/signin.route';
import { signoutRouter } from './routes/signout.route';
import { signupRouter } from './routes/signup.route';
import { errorHandler, NotFoundError } from '@badalcodeorg/common';

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

app.use(currentUserRouter);
app.use(siginRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

import express from 'express';
import 'express-async-errors';

import { currentUserRouter } from './routes/currentUser.route';
import { siginRouter } from './routes/signin.route';
import { signoutRouter } from './routes/signout.route';
import { signupRouter } from './routes/signup.route';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(siginRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

export { app };

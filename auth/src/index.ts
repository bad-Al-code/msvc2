import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/currentUser.route';
import { siginRouter } from './routes/signin.route';
import { signoutRouter } from './routes/signout.route';
import { signupRouter } from './routes/signUp';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(siginRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => {
    console.log('Auth: 3000!!!');
});

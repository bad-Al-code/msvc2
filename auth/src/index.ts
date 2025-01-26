import express from 'express';

import { currentUserRouter } from './routes/currentUser.route';
import { siginRouter } from './routes/signin.route';
import { signoutRouter } from './routes/signout.route';
import { signupRouter } from './routes/signup.route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(siginRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => {
    console.log('Auth: 3000!!!');
});

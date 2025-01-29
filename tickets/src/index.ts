import mongoose from 'mongoose';
import http from 'node:http';

import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not provided');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to DB');
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }

    const server = http.createServer(app);

    server.listen(3000, () => {
        console.log('Auth service running on port 3000!');
    });
};

start();

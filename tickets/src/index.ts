import mongoose from 'mongoose';
import http from 'node:http';

import { app } from './app';
import { natsWrraper } from './natsWrapper';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not provided');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not provided');
    }
    try {
        await natsWrraper.connect(
            'ticketing',
            'klasdj',
            'http://nats-srv:4222',
        );
        await mongoose.connect(process.env.MONGO_URI);
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

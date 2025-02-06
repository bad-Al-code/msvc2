import mongoose from 'mongoose';
import http from 'node:http';

import { app } from './app';
import { natsWrapper } from './natsWrapper';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not provided');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not provided');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID is not provided');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID is not provided');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL is not provided');
    }
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL,
        );

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }

    const server = http.createServer(app);

    server.listen(3000, () => {
        console.log('Tickets service running on port 3000!');
    });
};

start();

import { beforeAll, beforeEach, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer | null = null;

beforeAll(async () => {
    process.env.JWT_KEY = 'test_jwt_key';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    if (!mongoose.connection.readyState) return;

    const collections = await mongoose.connection.db!.collections();

    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    if (mongoose.connection.readyState) {
        await mongoose.connection.close();
    }
});

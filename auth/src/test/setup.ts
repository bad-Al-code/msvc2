import { beforeAll, beforeEach, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';
import { CookieNotFoundError } from '../errors/cookieNotFound.error';

declare global {
    var signin: () => Promise<string[]>;
}

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

global.signin = async (): Promise<string[]> => {
    const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({ email, password })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    if (!cookie) {
        throw new CookieNotFoundError();
    }

    return cookie;
};

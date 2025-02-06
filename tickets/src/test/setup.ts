import { vi, beforeAll, beforeEach, afterAll } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

vi.mock('../natsWrapper');

declare global {
    var signin: () => string[];
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

global.signin = (): string[] => {
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`session=${base64}`];
};

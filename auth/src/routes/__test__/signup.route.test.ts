import { describe, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app';

describe('Signup Route', () => {
    it('it returns a 201 on successful signup', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: 'al@al.com',
                password: '1235',
            })
            .expect(201);
    });

    it('returns a 400 with an invalid email', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: '214',
                password: '123214',
            })
            .expect(400);
    });

    it('returns a 400 with an invalid password', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: 'al@al.com',
                password: '12',
            })
            .expect(400);
    });

    it('returns a 400 with missing email and password', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({ email: 'al@al.com' })
            .expect(400);

        await request(app)
            .post('/api/users/signup')
            .send({
                password: '1234',
            })
            .expect(400);
    });
});

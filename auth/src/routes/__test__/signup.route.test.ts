import { it } from 'vitest';
import request from 'supertest';
import { app } from '../../app';

it('it returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'al@al.com',
            password: '1234',
        })
        .expect(201);
});

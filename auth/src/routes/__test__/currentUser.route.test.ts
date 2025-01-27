import { describe, it, expect } from 'vitest';
import request from 'supertest';

import { app } from '../../app';

describe('Current User Route', () => {
    /**
     * @test Should respond with details about the current user
     * @expect Responds with the current user's email and a 200 status code
     */
    it('should respond with details about the current user', async () => {
        const authResponse = await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            })
            .expect(201);
        const cookie = authResponse.get('Set-Cookie');

        const response = await request(app)
            .get('/api/users/currentUser')
            .set('Cookie', cookie!)
            .send()
            .expect(200);

        expect(response.body.currentUser.email).toEqual('test@test.com');
    });

    /**
     * @test Should respond with null if not authenticated
     * @expect Responds with a 200 status code and null for currentUser
     */
    it('should respond with null if no user is authenticated', async () => {
        const response = await request(app)
            .get('/api/users/currentUser')
            .send()
            .expect(200);

        expect(response.body.currentUser).toBeNull();
    });
});

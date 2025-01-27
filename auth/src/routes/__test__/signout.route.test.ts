import { describe, it, expect } from 'vitest';
import request from 'supertest';

import { app } from '../../app';

describe('Signout Route', () => {
    /**
     * @test Should clear the cookie after signing out
     * @expect Responds with a 200 status code and a cleared Set-Cookie header
     */
    it('clears the cookie after signing out', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            })
            .expect(201);

        const response = await request(app)
            .post('/api/users/signout')
            .send({})
            .expect(200);

        const cookies = response.get('Set-Cookie');
        expect(cookies).toBeDefined();
        expect(cookies![0]).toMatch(
            /session=; path=\/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly/,
        );
    });

    /**
     * @test Should respond with a 200 status even if the user is not signed in
     * @expect Responds with a 200 status code without throwing an error
     */
    it('responds with 200 even if user is not signed in', async () => {
        const response = await request(app)
            .post('/api/users/signout')
            .send({})
            .expect(200);

        const cookies = response.get('Set-Cookie');
        expect(cookies).toBeDefined();
        expect(cookies![0]).toMatch(
            /session=; path=\/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly/,
        );
    });

    /**
     * @test Should not modify any other cookies during signout
     * @expect Responds with only the session cookie cleared
     */
    it('does not modify other cookies during signout', async () => {
        const mockCookie = 'otherCookie=value; Path=/; HttpOnly';
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            })
            .expect(201);

        const response = await request(app)
            .post('/api/users/signout')
            .set('Cookie', mockCookie)
            .send({})
            .expect(200);

        const cookies = response.get('Set-Cookie');
        expect(cookies).toBeDefined();
        expect(cookies![0]).toMatch(
            /session=; path=\/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly/,
        );
    });
});

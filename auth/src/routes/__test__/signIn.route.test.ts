import { describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '../../app';

describe('SignIn Route', () => {
    /**
     * @test Should fail when an email that does not exist is provided
     * @expect Returns a 400 status code for invalid credentials
     */
    it('fails when a non-existent email is provided', async () => {
        await request(app)
            .post('/api/users/signin')
            .send({
                email: 'nonexistent@domain.com',
                password: 'password123',
            })
            .expect(400);
    });

    /**
     * @test Should fail when the password is incorrect
     * @expect Returns a 400 status code for invalid credentials
     */
    it('fails when an incorrect password is provided', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'validpassword',
            })
            .expect(201);

        await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@test.com',
                password: 'wrongpassword',
            })
            .expect(400);
    });

    /**
     * @test Should respond with a cookie when valid credentials are provided
     * @expect Returns a 200 status code and includes a Set-Cookie header
     */
    it('responds with a cookie when valid credentials are provided', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'validpassword',
            })
            .expect(201);

        const response = await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@test.com',
                password: 'validpassword',
            })
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });

    /**
     * @test Should fail when no email or password is provided
     * @expect Returns a 400 status code for missing required fields
     */
    it('fails when no email or password is provided', async () => {
        await request(app).post('/api/users/signin').send({}).expect(400);

        await request(app)
            .post('/api/users/signin')
            .send({ email: 'test@test.com' })
            .expect(400);

        await request(app)
            .post('/api/users/signin')
            .send({ password: 'password123' })
            .expect(400);
    });

    /**
     * @test Should handle invalid email formats
     * @expect Returns a 400 status code for invalid email format
     */
    it('fails when an invalid email format is provided', async () => {
        await request(app)
            .post('/api/users/signin')
            .send({
                email: 'invalidemail',
                password: 'password123',
            })
            .expect(400);
    });

    /**
     * @test Should handle invalid password formats
     * @expect Returns a 400 status code for invalid password input
     */
    it('fails when an invalid password is provided', async () => {
        await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@test.com',
                password: '',
            })
            .expect(400);
    });
});

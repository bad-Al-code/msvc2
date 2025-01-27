import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../../app';

describe('Signup Route', () => {
    /**
     * @test Should return 201 on successful signup
     * @expect Creates a new user and responds with a 201 status code
     */
    it('returns a 201 on successful signup', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'validpassword',
            })
            .expect(201);
    });

    /**
     * @test Should return 400 for invalid email format
     * @expect Responds with a 400 status code if the email is not valid
     */
    it('returns a 400 with an invalid email', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'invalid-email',
                password: 'validpassword',
            })
            .expect(400);
    });

    /**
     * @test Should return 400 for an invalid password
     * @expect Responds with a 400 status code if the password is too short
     */
    it('returns a 400 with an invalid password', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: '12',
            })
            .expect(400);
    });

    /**
     * @test Should return 400 for missing email or password
     * @expect Responds with a 400 status code if email or password is missing
     */
    it('returns a 400 with missing email and password', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({ password: 'validpassword' })
            .expect(400);

        await request(app)
            .post('/api/users/signup')
            .send({ email: 'test@test.com' })
            .expect(400);
    });

    /**
     * @test Should disallow duplicate email addresses
     * @expect Responds with a 400 status code if the email is already in use
     */
    it('disallows duplicate emails', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'validpassword',
            })
            .expect(201);

        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'validpassword',
            })
            .expect(400);
    });

    /**
     * @test Should set a cookie after successful signup
     * @expect Responds with a 201 status code and includes a Set-Cookie header
     */
    it('sets a cookie after successful signup', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'validpassword',
            })
            .expect(201);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});

import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../../app';
import { requireAuth } from '@badalcodeorg/common';
import { response } from 'express';

describe('New Ticket', () => {
    it('has a router handler listnening to /api/tickets for post requests', async () => {
        const response = await request(app).post('/api/tickets').send({});

        expect(response.status).not.toEqual(404);
    });

    it('should return a status other than 401 if user os signed in', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({});

        expect(response.status).not.toEqual(401);
    });

    it('can be only accessed of the user is signed in', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .send({})
            .expect(401);
    });

    it('return an error if an invalid title is provided', async () => {
        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({
                title: '',
                price: 10,
            })
            .expect(400);
        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({
                price: 10,
            })
            .expect(400);
    });

    it('returns an error if an invaid price is provided', async () => {
        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({
                title: 'Title',
                price: -12,
            })
            .expect(400);

        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({
                title: 'Title',
            })
            .expect(400);
    });

    it('create a ticket with valid inputs', async () => {
        // TODO: make sure to ticket is saved
        await request(app)
            .post('/api/ticket')
            .send({ title: 'Title', price: 10 })
            .expect(201);
    });
});

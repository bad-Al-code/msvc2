import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../../app';

describe('New Ticket', () => {
    it('has a router handler listnening to /api/tickets for post requests', async () => {
        const response = await request(app).post('/api/tickets').send({});

        expect(response.status).not.toEqual(404);
    });

    it('can be only accessed of the user is signed in', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .send({})
            .expect(401);
    });

    it('return an error if an invalid title is provided', async () => {});

    it('returns an error if an invaid price is provided', async () => {});

    it('create a ticket with valid inputs', async () => {});
});

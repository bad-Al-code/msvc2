import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { describe, expect, it } from 'vitest';

describe('Show Ticket', () => {
    it('should returns a 404 if the ticket is not found', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();

        const response = await request(app)
            .post(`/api/tickets/${id}`)
            .send()
            .expect(404);
    });

    it('should return the ticket if the ticket is found', async () => {
        const title = 'Title';
        const price = 10;

        const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({ title, price })
            .expect(201);

        const ticketResponse = await request(app)
            .get(`/api/tickets/${response.body.id}`)
            .send()
            .expect(200);

        expect(ticketResponse.body.title).toEqual(title);
        expect(ticketResponse.body.price).toEqual(price);
    });
});

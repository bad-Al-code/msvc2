import request from 'supertest';
import { describe, expect, it } from 'vitest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { natsWrapper } from '../../natsWrapper';

describe('Update a ticket', () => {
    it('returns a 404 if the provided id does not exist', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();

        await request(app)
            .put(`/api/tickets/${id}`)
            .set('Cookie', global.signin())
            .send({
                title: 'Title',
                price: 10,
            })
            .expect(404);
    });

    it('returns 401, if user is not authenticated', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();

        await request(app)
            .put(`/api/tickets/${id}`)
            .send({
                title: 'Title',
                price: 10,
            })
            .expect(401);
    });

    it('returns 401, if user does not own the ticket', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({ title: 'Title', price: 10 });

        await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', global.signin())
            .send({ title: 'New Title', price: 20 })
            .expect(401);
    });

    it('return 400, if user provides invalide tiltle or price', async () => {
        const cookie = global.signin();
        const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', cookie)
            .send({ title: 'Title', price: 10 });

        await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({ title: '', price: 10 })
            .expect(400);
        await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({ title: 'Title', price: -10 })
            .expect(400);
    });

    it('should updates the ticket, provided input valids', async () => {
        const cookie = global.signin();
        const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', cookie)
            .send({ title: 'Title', price: 10 });

        await request(app)
            .put(`/api/tickets/${response.body.id}`)
            .set('Cookie', cookie)
            .send({ title: 'New Title', price: 10 })
            .expect(200);

        const ticketResponse = await request(app)
            .get(`/api/tickets/${response.body.id}`)
            .send();

        expect(ticketResponse.body.title).toEqual('New Title');
        expect(ticketResponse.body.price).toEqual(10);
    });
});

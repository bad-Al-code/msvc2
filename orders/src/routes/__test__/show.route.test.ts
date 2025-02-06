import request from 'supertest';

import { app } from '../../app';
import { describe, it } from 'vitest';
import { Ticket } from '../../models/ticket.model';

describe('Show Order', () => {
    it('should fetched the order', async () => {
        const ticket = Ticket.build({ title: 'Title', price: 10 });
        await ticket.save();

        const user = global.signin();

        const response = await request(app)
            .post('/api/orders')
            .set('Cookie', user)
            .send({ ticketId: ticket.id })
            .expect(201);

        const fetchedResponse = await request(app)
            .get(`/api/orders/${response.body.order.id}`)
            .set('Cookie', user)
            .send()
            .expect(200);
    });
});

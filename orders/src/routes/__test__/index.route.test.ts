import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket.model';

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'Title',
        price: 10,
    });
    await ticket.save();

    return ticket;
};

describe('FetchTicket', () => {
    it('should fetch orders for an particualr user', async () => {
        const ticketOne = await buildTicket();
        const ticketTwo = await buildTicket();
        const ticketThree = await buildTicket();

        const userOne = global.signin();
        const userTwo = global.signin();

        await request(app)
            .post('/api/orders')
            .set('Cookie', userOne)
            .send({ ticketId: ticketOne.id })
            .expect(201);

        const { body: orderOne } = await request(app)
            .post('/api/orders')
            .set('Cookie', userTwo)
            .send({ ticketId: ticketTwo.id })
            .expect(201);

        const { body: orderTwo } = await request(app)
            .post('/api/orders')
            .set('Cookie', userTwo)
            .send({ ticketId: ticketThree.id })
            .expect(201);

        const response = await request(app)
            .get('/api/orders')
            .set('Cookie', userTwo)
            .expect(200);

        console.log(orderOne.order.id);

        expect(response.body[0].id).toEqual(orderOne.order.id);
        expect(response.body[1].id).toEqual(orderTwo.order.id);
        expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
        expect(response.body[1].ticket.id).toEqual(ticketThree.id);
    });
});

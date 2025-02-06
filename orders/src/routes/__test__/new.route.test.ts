import request from 'supertest';
import { describe, it } from 'vitest';
import { Types } from 'mongoose';

import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order.model';
import { Ticket } from '../../models/ticket.model';

describe('New Order', () => {
    it('should returns an error if the ticket does not exists', async () => {
        const ticketId = new Types.ObjectId();
        await request(app)
            .post('/api/orders')
            .set('Cookie', global.signin())
            .send({ ticketId })
            .expect(404);
    });

    it('should returns an error if the ticket is already reserved', async () => {
        const ticket = Ticket.build({
            title: 'Title',
            price: 10,
        });

        await ticket.save();
        const order = Order.build({
            ticket,
            userId: 'asdadlakkdj',
            status: OrderStatus.Created,
            expiresAt: new Date(),
        });

        await order.save();

        await request(app)
            .post('/api/orders')
            .set('Cookie', global.signin())
            .send({ ticketId: ticket.id })
            .expect(400);
    });

    it('should reserve a ticket', async () => {
        const ticket = Ticket.build({
            title: 'Title',
            price: 10,
        });
        await ticket.save();

        await request(app)
            .post('/api/orders')
            .set('Cookie', global.signin())
            .send({ ticketId: ticket.id })
            .expect(201);
    });

    // TODO:
    it.todo('emits an order created event');
});

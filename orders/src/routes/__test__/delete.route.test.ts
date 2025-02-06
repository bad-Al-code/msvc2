import mongoose from 'mongoose';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { OrderStatus } from '@badalcodeorg/common';

import { app } from '../../app';
import { Order } from '../../models/order.model';
import { Ticket } from '../../models/ticket.model';

describe('Delete Order', () => {
    it('should cancel an order successfully', async () => {
        const ticket = Ticket.build({ title: 'Concert', price: 50 });
        await ticket.save();

        const user = global.signin();

        const orderResponse = await request(app)
            .post('/api/orders')
            .set('Cookie', user)
            .send({ ticketId: ticket.id })
            .expect(201);

        const orderId = orderResponse.body.order.id;

        await request(app)
            .delete(`/api/orders/${orderId}`)
            .set('Cookie', user)
            .send()
            .expect(204);

        const updatedOrder = await Order.findById(orderId);
        expect(updatedOrder!.status).toBe(OrderStatus.Cancelled);
    });

    it('should return 401 if user is not authenticated', async () => {
        const orderId = new mongoose.Types.ObjectId().toHexString();

        await request(app).delete(`/api/orders/${orderId}`).send().expect(401);
    });

    it('should return 400 for an invalid order ID', async () => {
        const user = global.signin();

        await request(app)
            .delete('/api/orders/invalid-id')
            .set('Cookie', user)
            .send()
            .expect(400);
    });

    it('should return 404 if the order is not found', async () => {
        const user = global.signin();
        const nonExistentOrderId = new mongoose.Types.ObjectId().toHexString();

        await request(app)
            .delete(`/api/orders/${nonExistentOrderId}`)
            .set('Cookie', user)
            .send()
            .expect(404);
    });

    it("should return 401 if user tries to cancel another user's order", async () => {
        const ticket = Ticket.build({ title: 'Event', price: 30 });
        await ticket.save();

        const userOne = global.signin();
        const userTwo = global.signin();

        const response = await request(app)
            .post('/api/orders')
            .set('Cookie', userOne)
            .send({ ticketId: ticket.id })
            .expect(201);

        await request(app)
            .delete(`/api/orders/${response.body.order.id}`)
            .set('Cookie', userTwo)
            .send()
            .expect(401);
    });
});

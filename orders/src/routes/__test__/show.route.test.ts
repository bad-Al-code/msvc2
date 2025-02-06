import request from 'supertest';
import { app } from '../../app';
import { Types } from 'mongoose';
import { describe, it, expect } from 'vitest';

import { Ticket } from '../../models/ticket.model';

/**
 * Test suite for the "Show Order" endpoint.
 */
describe('Show Order', () => {
    /**
     * Test case: Successfully fetching an order.
     * - Creates a ticket.
     * - Places an order.
     * - Fetches the order and verifies the response.
     */
    it('should fetch the order successfully', async () => {
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

        expect(fetchedResponse.body.id).toBe(response.body.order.id);
    });

    /**
     * Test case: Attempting to fetch an order without authentication.
     * - Sends a request without a cookie.
     * - Expects a 401 Unauthorized error.
     */
    it('should return 401 if user is not authenticated', async () => {
        const response = await request(app)
            .get('/api/orders/someOrderId')
            .send()
            .expect(401);
    });

    /**
     * Test case: Attempting to fetch an order with an invalid order ID.
     * - Sends a request with an invalid MongoDB ObjectId.
     * - Expects a 400 Bad Request error.
     */
    it('should return 400 if order ID is invalid', async () => {
        const user = global.signin();

        const response = await request(app)
            .get('/api/orders/invalid-order-id')
            .set('Cookie', user)
            .send()
            .expect(400);
    });

    /**
     * Test case: Attempting to fetch a non-existent order.
     * - Generates a random ObjectId.
     * - Expects a 404 Not Found error.
     */
    it('should return 404 if the order does not exist', async () => {
        const user = global.signin();
        const nonExistentOrderId = new Types.ObjectId().toHexString();

        const response = await request(app)
            .get(`/api/orders/${nonExistentOrderId}`)
            .set('Cookie', user)
            .send()
            .expect(404);
    });

    /**
     * Test case: Attempting to fetch another user's order.
     * - Creates a ticket.
     * - User A places an order.
     * - User B attempts to fetch User A's order.
     * - Expects a 401 Unauthorized error.
     */
    it("should return 401 if user tries to fetch another user's order", async () => {
        const ticket = Ticket.build({ title: 'Title', price: 10 });
        await ticket.save();

        const userOne = global.signin();
        const userTwo = global.signin();

        const response = await request(app)
            .post('/api/orders')
            .set('Cookie', userOne)
            .send({ ticketId: ticket.id })
            .expect(201);

        await request(app)
            .get(`/api/orders/${response.body.order.id}`)
            .set('Cookie', userTwo)
            .send()
            .expect(401);
    });
});

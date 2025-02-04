import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../../app';

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title: 'Title', price: 10 });
};

describe('Retrive all tickets', () => {
    it('should fetch a list of tickets', async () => {
        await createTicket();
        await createTicket();
        await createTicket();

        const respone = await request(app)
            .get('/api/tickets')
            .send()
            .expect(200);

        expect(respone.body.length).toEqual(3);
    });
});

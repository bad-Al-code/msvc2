import { describe, it, expect } from 'vitest';
import { Ticket } from '../ticket.model';

describe('Ticket Model habdle concurrency ', () => {
    it('should implement optimistiz concurrency control', async () => {
        const ticket = Ticket.build({
            title: 'Title',
            price: 10,
            userId: '123',
        });

        await ticket.save();

        const firstInstance = await Ticket.findById(ticket.id);
        const secondInstance = await Ticket.findById(ticket.id);

        firstInstance!.set({ price: 15 });
        secondInstance!.set({ price: 20 });

        await firstInstance!.save();

        expect(async () => {
            await secondInstance!.save();
        }).rejects.toThrow();
    });

    it('should increments multople version number on multople saves', async () => {
        const ticket = Ticket.build({
            title: 'Title',
            price: 10,
            userId: '123',
        });

        await ticket.save();
        expect(ticket.version).toEqual(0);

        await ticket.save();
        expect(ticket.version).toEqual(1);

        await ticket.save();
        expect(ticket.version).toEqual(2);
    });
});

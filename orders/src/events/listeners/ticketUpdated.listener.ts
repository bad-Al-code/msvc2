import { Listener, Subjects, TicketUpdatedEvent } from '@badalcodeorg/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';

import { Ticket } from '../../models/ticket.model';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName: string = queueGroupName;

    async onMessage(
        data: TicketUpdatedEvent['data'],
        msg: Message,
    ): Promise<void> {
        const { title, price } = data;

        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            throw new Error('Ticket not found');
        }

        ticket.set({ title, price });
        await ticket.save();

        msg.ack();
    }
}

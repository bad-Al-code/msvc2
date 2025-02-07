import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@badalcodeorg/common';

import { queueGroupName } from './queueGroupName';
import { Ticket } from '../../models/ticket.model';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(
        data: TicketCreatedEvent['data'],
        msg: Message,
    ): Promise<void> {
        const { id, title, price } = data;

        const ticket = Ticket.build({
            id,
            title,
            price,
        });

        await ticket.save();

        msg.ack();
    }
}

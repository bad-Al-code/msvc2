import { Message } from 'node-nats-streaming';
import { Listener } from './baseListener';
import { TicketCreatedEvent } from './ticketCreatedEvent';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event Data! ', data);
        // TODO: Do something here

        console.log(data.id);
        console.log(data.price);
        console.log(data.title);

        msg.ack();
    }
}

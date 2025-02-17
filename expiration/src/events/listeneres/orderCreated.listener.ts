import { Listener, OrderCreatedEvent, Subjects } from '@badalcodeorg/common';
import { Message } from 'node-nats-streaming';

import { expirationQueue } from '../../queues/expiration.queue';
import { queueGroupName } from './queueGroupName';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log(delay);

        await expirationQueue.add(
            {
                orderId: data.id,
            },
            {
                delay: delay,
            },
        );

        msg.ack();
    }
}

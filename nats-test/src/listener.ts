import nats, { Message } from 'node-nats-streaming';
import crypto from 'node:crypto';

console.clear();

const stan = nats.connect('ticketing', crypto.randomUUID(), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('NATS listener');

    stan.on('close', () => {
        console.log('NAT close');
        process.exit();
    });

    const options = stan.subscriptionOptions().setManualAckMode(true);

    const subscription = stan.subscribe(
        'ticket:created',
        'ordersServiceQueueGroup',
    );

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(
                `Reveiced event #${msg.getSequence()}, with data: ${data}`,
            );
        }

        msg.ack();
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

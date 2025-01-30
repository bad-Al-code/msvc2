import nats from 'node-nats-streaming';
import crypto from 'node:crypto';

import { TicketCreatedListener } from './events/ticketCreatedListener';

console.clear();

const stan = nats.connect('ticketing', crypto.randomUUID(), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('NATS listener');

    stan.on('close', () => {
        console.log('NAT closed!');
        process.exit();
    });

    new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

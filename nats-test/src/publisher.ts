import nats from 'node-nats-streaming';

import { TicketCreatedPublisher } from './events/ticketCreatedPublisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('NATS Publisher');

    const publisher = new TicketCreatedPublisher(stan);
    publisher.publish({
        id: 'qwe',
        title: 'asdadsa',
        price: 123,
    });
});

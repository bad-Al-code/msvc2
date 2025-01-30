import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('NATS Publisher');

    const data = JSON.stringify({
        id: '123',
        title: 'connect',
        price: 20,
        name: 'asd',
    });

    stan.publish('ticket:created', data, () => {
        console.log('Event published');
    });
});

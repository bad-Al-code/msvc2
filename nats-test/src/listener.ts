import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '124', {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('NATS listener');

    const subscription = stan.subscribe('ticket:created');

    subscription.on('message', (msg) => {
        console.log('message received');
    });
});

import { vi } from 'vitest';

export const natsWrapper = {
    client: {
        publish: vi
            .fn()
            .mockImplementation(
                (subject: string, data: string, callback: () => void) => {
                    console.log(`Mock NATS Publish: ${subject}`);
                    callback(); // Simulate a successful publish event
                },
            ),
    },
};

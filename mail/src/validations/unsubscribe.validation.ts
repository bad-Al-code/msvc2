import { z } from 'zod';

export const unsubscribeSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
});

export type UnsubscribeInput = z.infer<typeof unsubscribeSchema>;

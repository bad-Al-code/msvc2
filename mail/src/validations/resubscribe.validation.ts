import { z } from 'zod';

export const resubscribeSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
});

export type ResubscribeInput = z.infer<typeof resubscribeSchema>;

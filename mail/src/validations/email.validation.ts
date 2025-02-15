import { z } from 'zod';

export const sendWelcomeEmailSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    name: z.string().min(1, { message: 'Name is required' }),
});

export type SendWelcomeEmailInput = z.infer<typeof sendWelcomeEmailSchema>;

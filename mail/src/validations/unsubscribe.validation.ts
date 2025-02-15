import { z } from 'zod';

export const unsubscribeSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    reason: z
        .string()
        .max(500, { message: 'Reason must be less than 500 characters' })
        .optional(),
});

export const validateUnsubscribe = (req: any, res: any, next: any) => {
    try {
        unsubscribeSchema.parse(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.errors });
    }
};
